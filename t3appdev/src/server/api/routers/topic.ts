import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.topic.findMany({
          where: {
            userId: ctx.session.user.id,
          },
        });
      }),

create: protectedProcedure
.input(z.object({ title: z.string().min(1) }))
.mutation(async ({ ctx, input }) => {
      return ctx.db.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    })
});