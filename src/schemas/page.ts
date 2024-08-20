import { z } from 'astro:content'
import { base } from './base'
import { block } from './block'
import { pathSchema } from './utils'

export const page = base
  .extend({
    meta: z
      .object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
      .partial()
      .passthrough(),
    pages: pathSchema('pages').array(),
    title: z.string(),
    description: z.string(),
    header: block.or(z.literal(false)),
    banner: block.or(z.literal(false)),
    hero: block.or(z.literal(false)),
    blocks: block.array().or(z.object({}).catchall(block)),
    cta: block.or(z.literal(false)),
    footer: block.or(z.literal(false)),
    categories: pathSchema('categories').array(),
  })
  .partial()
  .passthrough()

export type Page = z.infer<typeof page>
