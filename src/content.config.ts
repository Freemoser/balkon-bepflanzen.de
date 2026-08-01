import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Lisa Berger'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    emoji: z.string().default('🌿'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
