import { z } from "zod";
import { createTRPCRouter, protectedBistroMemberProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const positionRouter = createTRPCRouter({
  create: protectedBistroMemberProcedure({ isModerator: true })
    .input(
      z.object({
        postionName: z.string().min(1),
        hourlyRate: z.number().int().min(0),
        positionTipPercent: z.number().int().min(0).max(100),
      })
    )
    .mutation(({ ctx, input }) => {
      const { hourlyRate, positionTipPercent, postionName } = input;
      return ctx.prisma.position.create({
        data: {
          name: postionName,
          bistroId: ctx.session.bistroId,
          hourlyRate,
          positionTipPercent,
        },
      });
    }),
  delete: protectedBistroMemberProcedure({ isModerator: true })
    .input(z.object({ positionId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const bistroUserPositions = await ctx.prisma.bistroUserPosition.findMany({
        where: { positionId: input.positionId },
      });
      const isPositionNotUsed =
        !bistroUserPositions || bistroUserPositions.length < 1;
      const isOnlySelfAssinged =
        bistroUserPositions.length < 2 &&
        bistroUserPositions.find(
          (v) => v.bistroUserId === ctx.session.bistroUserId
        );

      if (isPositionNotUsed || isOnlySelfAssinged) {
        void ctx.prisma.bistroUserPosition.deleteMany({
          where: { positionId: input.positionId },
        });
        return ctx.prisma.position.delete({ where: { id: input.positionId } });
      } else {
        // other user prevalent, cannot erase (maybe flag for timed cascading delete?)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "There are other users assigned to this position",
        });
      }
    }),
  getAllWithBistroUsers: protectedBistroMemberProcedure().query(
    async ({ ctx: { prisma, session } }) => {
      return prisma.position.findMany({
        where: { bistroId: session.bistroId },
        include: {
          bistroUserPositions: {
            include: {
              bistroUser: { include: { user: {} } },
            },
          },
        },
      });
    }
  ),
  getUnassignedBistroUsers: protectedBistroMemberProcedure()
    .input(z.object({ positionId: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.bistroUser.findMany({
        where: {
          bistroId: ctx.bistroId,
          bistroUserPositions: { none: { positionId: input.positionId } },
        },
        include: { user: { select: { name: true } } },
      });
    }),
});
