import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    category: z.string(),
    categories: z.array(z.string()).optional(),
    author: z.string().default('AeroScan'),
    tags: z.array(z.string()).optional(),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: z.object({
    cityName: z.string(),
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroSubtitle: z.string(),
    heroImage: z.string(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
    landmarks: z.array(z.string()).optional(),
    nearbyTowns: z.array(z.string()).optional(),
    zipCode: z.string().optional(),
  }),
});

export const collections = { blog, cities };
