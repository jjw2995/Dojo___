import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// type tipForm

export const tipFormRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ bistroId: z.string() }))
    .query(({ ctx, input: { bistroId } }) => {
      return ctx.prisma.tipForm.findMany({ where: { bistroId: bistroId } });
    }),
  // variables str[], equation str
  // create: protectedProcedure
  //   .input(z.object({}))
  //   .mutation(({ ctx, input }) => {}),
});
