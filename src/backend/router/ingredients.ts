import * as trpc from '@trpc/server';
import { resolve } from 'path';
import superjson from 'superjson';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

export const ingredientsRouter = trpc
  .router()
  .transformer(superjson)
  .query('.get-ingredients', {
    async resolve() {
      const ingredients = await prisma.ingredient.findMany();
      return {
        ingredients,
      };
    },
  })
  .mutation('.create-ingredient', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      imagePath: z.string(),
    }),
    async resolve({ input }) {
      const ingredient = await prisma.ingredient.create({
        data: {
          ...input
        }
      });
      return { success: true }
    }
  });