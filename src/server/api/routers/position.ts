import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const positionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ bistroId: z.string().cuid(), name: z.string().min(1) }))
    .mutation(({ ctx: { prisma, session }, input: { bistroId, name } }) => {
      //
      // ctx.prisma.bistroUser.findFirst({where:{authority:"MODERATOR",bistroId:}})
      prisma.$transaction(async (tx) => {
        const bistroUser = await tx.bistroUser.findFirst({
          where: { authority: "MODERATOR", bistroId, userId: session.user.id },
        });

        if (!bistroUser) {
          throw new Error(
            `${session.user.name} does not have authority to add a position to this bistro`
          );
        }

        const position = tx.position.create({ data: { name, bistroId } });

        return position;
      });
    }),
});
