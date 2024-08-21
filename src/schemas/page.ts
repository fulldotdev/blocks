import { z } from 'astro:content'
import { base } from './base'
import { block } from './block'
import { pathSchema } from './utils'

export const page = base
  .extend({
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
      .partial()
      .passthrough(),
    code: z
      .object({
        head: z.string(),
        body: z.string(),
      })
      .partial()
      .passthrough(),
    pages: pathSchema('pages').array(),
    settings: pathSchema('settings'),
    title: z.string(),
    description: z.string(),
    header: block.or(z.literal(false)),
    headers: block.array().or(z.literal(false)),
    hero: block.or(z.literal(false)),
    block: block.or(z.literal(false)),
    blocks: block.array().or(z.object({}).catchall(block)),
    section: block.or(z.literal(false)),
    sections: block.array().or(z.literal(false)),
    cta: block.or(z.literal(false)),
    footer: block.or(z.literal(false)),
    footers: block.array().or(z.literal(false)),
  })
  .partial()
  .passthrough()

export type Page = z.infer<typeof page>
