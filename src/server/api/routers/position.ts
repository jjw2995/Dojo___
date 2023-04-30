import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// export type tipPercent = z.infer({"2022-02-01":"sd"})
// z.Schema
const tipPercent = z.map(z.string().datetime(), z.number());
type tipPercent = z.infer<typeof tipPercent>;

export const positionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ bistroId: z.string().cuid(), name: z.string().min(1) }))
    .mutation(({ ctx: { prisma, session }, input: { bistroId, name } }) => {
      //
      // ctx.prisma.bistroUser.findFirst({where:{authority:"MODERATOR",bistroId:}})
      prisma.$transaction(async (tx) => {
        const u = await tx.bistroUser.findFirst({
          where: { authority: "MODERATOR", bistroId, userId: session.user.id },
        });

        if (!u) {
          // return error
          return;
        }

        // const position = await tx.position.create({ data: { name, } });
      });
    }),
});
