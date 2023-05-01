import { z } from "zod";
import { createTRPCRouter, protectedBistroMemberProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const positionRouter = createTRPCRouter({
  getAll: protectedBistroMemberProcedure().query(
    ({ ctx: { prisma, session } }) => {
      return prisma.position.findMany({
        where: { bistroId: session.bistroId },
      });
    }
  ),
  create: protectedBistroMemberProcedure({ isModerator: true })
    .input(z.object({ postionName: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.position.create({
        data: { name: input.postionName, bistroId: ctx.session.bistroId },
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
        ctx.prisma.bistroUserPosition.deleteMany({
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
  // assignPositionToBistroUser:
});
