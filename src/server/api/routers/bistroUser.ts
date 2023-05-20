import { z } from "zod";
import {
  createTRPCRouter,
  protectedBistroMemberProcedure,
  protectedProcedure,
} from "../trpc";

export const bistroUserRouter = createTRPCRouter({
  getSelf: protectedBistroMemberProcedure().query(({ ctx }) => {
    return ctx.session;
  }),
  isMod: protectedBistroMemberProcedure().query(({ ctx, input }) => {
    return ctx.session.authority === "MODERATOR";
  }),
  getAll: protectedBistroMemberProcedure().query(({ ctx }) => {
    return ctx.prisma.bistroUser.findMany({
      where: { bistroId: ctx.session.bistroId },
      include: { user: {} },
    });
  }),

  delete: protectedBistroMemberProcedure({ isModerator: true })
    .input(z.object({ bistroUserId: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      // TODO: change to flagged, 1 month cron delete
      return ctx.session.bistroUserId === input.bistroUserId
        ? null
        : ctx.prisma.bistroUser.delete({ where: { id: input.bistroUserId } });
    }),

  getAllNotAssignedToPosition: protectedBistroMemberProcedure()
    .input(z.object({ positionId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.bistroUser.findMany({
        where: {
          bistroId: ctx.session.bistroId,
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
      where: { bistroId: ctx.session.bistroId },
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
