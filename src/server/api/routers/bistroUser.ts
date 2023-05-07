import { z } from "zod";
import {
  createTRPCRouter,
  protectedBistroMemberProcedure,
  protectedProcedure,
} from "../trpc";

export const bistroUserRouter = createTRPCRouter({
  // getAll
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bistroUser.findMany({
      where: { userId: ctx.session.user.id },
      include: { bistro: true },
    });
  }),
  getAllNotAssignedToPosition: protectedBistroMemberProcedure()
    .input(z.object({ positionId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.bistroUser.findMany({
        where: {
          bistroId: ctx.bistroId,
          bistroUserPositions: { none: { positionId: input.positionId } },
        },
        include: { user: { select: { name: true } } },
      });

      const myBistroUsersObj = res.map((r) => {
        const { authority, id, user } = r;
        return { authority, id, name: user.name };
      });
      return myBistroUsersObj;
    }),
  getAllWithPositions: protectedBistroMemberProcedure().query(({ ctx }) => {
    return ctx.prisma.bistroUser.findMany({
      where: { bistroId: ctx.bistroId },
      include: { bistroUserPositions: {} },
    });
  }),
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

      return ctx.prisma.bistroUserPosition.create({
        data: {
          bistroUser: { connect: { id: targetBistroUserId } },
          position: { connect: { id: targetPositionId } },
        },
        include: { bistroUser: {}, position: {} },
      });
    }),
  unassignPosition: protectedBistroMemberProcedure({ isModerator: true })
    .input(
      z.object({
        bistroUserPositionId: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bistroUserPosition.delete({
        where: { id: input.bistroUserPositionId },
      });
    }),
});
