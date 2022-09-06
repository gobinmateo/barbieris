import * as trpc from '@trpc/server';
import superjson from 'superjson';
import { ingredientsRouter } from './ingredients';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge('ingredients', ingredientsRouter)
// export type definition of API
export type AppRouter = typeof appRouter;