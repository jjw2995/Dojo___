/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";

import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

type CreateContextOptions = {
  session: Session | null;

  // addon for bistro paths
  bistroId?: string;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    bistroId: opts.bistroId,
    // inBistro: opts.inBistro,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  // ADD-ON: if bistro/[bistroId]/*, attach bistroId for processing later
  const urlTokens = req.headers.referer?.split("/");
  const index = urlTokens?.findIndex((elem) => elem === "bistro");
  let bistroId = "";
  if (index && urlTokens && urlTokens.length > index) {
    bistroId = urlTokens[index + 1];
  }
  // make query with bistroId explicit
  return createInnerTRPCContext({ session, bistroId });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// ============================================================
// =======================add_on===============================
// ============================================================
/**
 * ADD_ON
 *
 * extending domain specific requirements, using DB information
 */

export const protectedBistroMemberProcedure = (
  opts: {
    isModerator: boolean;
    errMessage?: string;
  } = { isModerator: false }
) => {
  const { isModerator, errMessage } = opts;
  return protectedProcedure.use(async ({ ctx, next, ...rest }) => {
    console.log(rest);

    if (ctx.bistroId === "") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "bistroId not found in URL",
      });
    }

    const bistroUser = await ctx.prisma.bistroUser.findFirst({
      where: isModerator
        ? {
            authority: "MODERATOR",
            bistroId: ctx.bistroId,
            userId: ctx.session.user.id,
          }
        : { bistroId: ctx.bistroId, userId: ctx.session.user.id },
    });

    if (!bistroUser) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `user [${ctx.session.user.id}] is not ${
          isModerator ? "moderator" : "member"
        } of the Bistro. ${errMessage ? errMessage : ""}`,
      });
    }
    return next({
      ctx: {
        // ...ctx,
        // infers the `session` as non-nullable
        session: {
          ...ctx.session,
          bistroId: ctx.bistroId,
          bistroUserId: bistroUser.id,
          authority: bistroUser.authority,
        },
      },
    });
  });
};
