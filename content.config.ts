import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const lessonCategory = z.enum([
  'introduction',
  'indicators',
  'combinations',
  'trading-system',
  'wyckoff',
  'glossary',
])

const lessonLevel = z.enum([
  'beginner',
  'intermediate',
  'advanced',
])

const lessonStatus = z.enum([
  'draft',
  'review',
  'published',
  'archived',
])

export default defineContentConfig({
  collections: {
    lessons: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['HANDOFF.md', 'HANDOFF-*.md'],
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        part: z.number(),
        category: lessonCategory,
        level: lessonLevel,
        order: z.number(),
        slug: z.string(),
        indicator: z.object({
          type: z.string(),
          difficulty: z.string(),
        }).optional(),
        learning: z.object({
          prerequisites: z.array(z.string()).optional(),
          next: z.array(z.string()).optional(),
        }).optional(),
        visual: z.object({
          cover: z.string().optional(),
          charts: z.array(z.string()).optional(),
        }).optional(),
        status: lessonStatus.optional(),
      }),
      indexes: [
        { columns: ['category'] },
        { columns: ['part', 'order'] },
        { columns: ['slug'] },
      ],
    }),
  },
})
