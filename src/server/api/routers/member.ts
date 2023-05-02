import { createTRPCRouter, protectedBistroMemberProcedure } from "../trpc";

export const memberRouter = (bistroId: String) => {
  return createTRPCRouter({
    testAAA: protectedBistroMemberProcedure({ isModerator: true }).query(
      ({ ctx }) => {}
    ),
    // test: protectedBistroMemberProcedure("")
  });
};
