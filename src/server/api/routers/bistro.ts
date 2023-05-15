import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bistroRouter = createTRPCRouter({
  searchByOSM: protectedProcedure
    .input(
      z.object({
        osm_id: z.number().optional(),
        osm_type: z.string().optional(),
      })
    )
    .query(({ ctx, input: { osm_id, osm_type } }) => {
      return ctx.prisma.bistro.findMany({
        where: {
          osm_id,
          osm_type,
          bistroUser: { none: { userId: ctx.session.user.id } },
        },
      });
    }),
  searchByName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(150),
      })
    )
    .query(({ ctx, input: { name } }) => {
      const sear = name
        .split(" ")
        .filter((v) => v !== " ")
        .map((v) => `*${v}*`)
        .join(" ");
      // console.log(sear);

      return ctx.prisma.bistro.findMany({
        where: {
          name: {
            search: sear,
          },
          bistroUser: { none: { userId: ctx.session.user.id } },
        },
      });
    }),

  getAllUserIsPartOf: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bistro.findMany({
      where: { bistroUser: { some: { userId: ctx.session.user.id } } },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50),
        osm_id: z.number().optional(),
        osm_type: z.string().optional(),
        osm_display_name: z.string().optional(),
        osm_lat: z.string().optional(),
        osm_lon: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bistroUser.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          bistro: { create: { ...input } },
          authority: "MODERATOR",
        },
      });
    }),

  // TODO: change to pBUP
  delete: protectedProcedure
    .input(z.object({ bistroId: z.string().cuid() }))
    .mutation(({ ctx, input: { bistroId } }) => {
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
