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
  get: protectedProcedure
    .input(z.object({ bistroId: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      ctx.prisma.bistroUser.findFirst({
        where: { bistroId: input.bistroId, userId: ctx.session.user.id },
      });
    }),
});
