import * as trpc from '@trpc/server';
import superjson from 'superjson';
import { ingredientsRouter } from './ingredients';
import { recipesRouter } from './recipes';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge('ingredients', ingredientsRouter)
  .merge('recipes', recipesRouter)
// export type definition of API
export type AppRouter = typeof appRouter;