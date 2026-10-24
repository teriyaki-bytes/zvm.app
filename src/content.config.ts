import { defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { blogSchema } from "starlight-blog/schema";
import { docsLoader } from "@astrojs/starlight/loaders";
import { z } from "astro/zod";

const contentSchema = docsSchema({
  extend: (context) => blogSchema(context).extend({
    author: z.string().trim().min(1).optional(),
  }),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: (context) => contentSchema(context).transform((data) => ({
      ...data,
      // Keep the single-author shorthand compatible with the blog plugin's bylines and SEO.
      authors: data.authors ?? (data.author ? { name: data.author } : undefined),
    })),
  }),
};
