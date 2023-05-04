import { z } from "zod";
import {
  createTRPCRouter,
  protectedBistroMemberProcedure,
  protectedProcedure,
} from "../trpc";

export const bistroUserRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bistroUser.findMany({
      where: { userId: ctx.session.user.id },
      include: { bistro: true },
    });
  }),
  getAllNotAssignedToPosition: protectedBistroMemberProcedure()
    .input(z.object({ positionId: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.bistroUser.findMany({
        where: {
          bistroId: input.bistroId,
          bistroUserPositions: { none: { positionId: input.positionId } },
        },
        include: { user: { select: { name: true } } },
      });
    }),
  getAllWithPositions: protectedBistroMemberProcedure().query(
    ({ ctx, input }) => {
      return ctx.prisma.bistroUser.findMany({
        where: { bistroId: input.bistroId },
        include: { bistroUserPositions: {} },
      });
    }
  ),
  get: protectedProcedure
    .input(z.object({ bistroId: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bistroUser.findFirst({
        where: { bistroId: input.bistroId, userId: ctx.session.user.id },
      });
    }),
  assignPosition: protectedBistroMemberProcedure({ isModerator: true })
    .input(
      z.object({
        targetBistroUserId: z.string().cuid(),
        targetPositionId: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { targetBistroUserId, targetPositionId } = input;
      // console.log(ctx);
      // console.log(input);
      // ctx.prisma.bistroUser.

      return ctx.prisma.bistroUserPosition.create({
        data: {
          bistroUser: { connect: { id: targetBistroUserId } },
          position: { connect: { id: targetPositionId } },
        },
        include: { bistroUser: {}, position: {} },
      });
    }),
});
