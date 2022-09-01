import * as trpc from '@trpc/server';
import { z } from 'zod';

class CustomString extends String {
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  repeatify(times: number) {
    let result = '';
    for (let i = 0; i < times; i++) {
      result = result.concat(this.value);
    }
    return result;
  }

}

const a = new CustomString('abcd');
console.log(a.repeatify(3));

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  });

export type AppRouter = typeof appRouter;