import { createTRPCRouter } from "~/server/api/trpc";
// import { exampleRouter } from "~/server/api/routers/example";
import { bistroRouter } from "./routers/bistro";
import { payRouter } from "./routers/pay";
import { positionRouter } from "./routers/position";
import { bistroUserRouter } from "./routers/bistroUser";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  bistro: bistroRouter,
  bistroUser: bistroUserRouter,
  pay: payRouter,
  position: positionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
