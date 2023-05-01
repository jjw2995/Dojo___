import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedBistroMemberProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const bistroRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bistro.findMany();
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(3).max(50) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bistroUser.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          bistro: { create: { name: input.name, placeId: input.name } },
          authority: "MODERATOR",
        },
      });
    }),

  // TODO: change to pBUP
  delete: protectedProcedure
    .input(z.object({ bistroId: z.string().cuid() }))
    .mutation(({ ctx, input: { bistroId } }) => {
      // ctx.prisma.bistro.deleteMany({where:{}})
      /**
       * isMod && mod > 1 flag
       * isMod && mod = 1 delete
       * !isMod
       */
      return ctx.prisma.bistroUser
        .findMany({
          where: { authority: "MODERATOR", bistroId: bistroId },
        })
        .then((r) => {
          if (r.find((v) => v.userId === ctx.session.user.id)) {
            if (r.length > 1) {
              // flag later
              return;
            } else {
              return ctx.prisma.bistro.delete({ where: { id: bistroId } });
            }
          } else {
            throw new TRPCError({ code: "BAD_REQUEST" });
          }
        });
    }),
  // deleteA: protectedBistroMemberProcedure({ isModerator: true }).,
});
