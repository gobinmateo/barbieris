import * as trpc from '@trpc/server';
import { resolve } from 'path';
import superjson from 'superjson';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

export const recipesRouter = trpc
  .router()
  .transformer(superjson)
  .query('.get-recipes', {
    async resolve() {
      const recipes = await prisma.recipe.findMany();
      return {
        recipes,
      };
    },
  })
  .mutation('.create-recipe', {
    input: z.object({
      name: z.string(),
      preparation: z.string(),
      imagePath: z.string(),
      ingredientIds: z.array(z.string())
    }),
    async resolve({ input }) {
      const recipe = await prisma.recipe.create({
        data: {
          ...input,
          // ingredients,
        },
      });
      return { success: true };
    }
  });