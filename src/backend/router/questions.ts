import * as trpc from '@trpc/server';
import superjson from 'superjson';

export const questionsRouter = trpc
  .router()
  .transformer(superjson)
  .query('.get-all', {
    resolve() {
      return {
        questions: 'What are you doing?',
      };
    },
  });