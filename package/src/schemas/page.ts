import { reference, z } from 'astro:content'
import { base } from './base'
import { block } from './block'

export const head = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  })
  .partial()
  .passthrough()

export const page = base.extend({
  head: z
    .object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
    })
    .partial()
    .passthrough(),
  header: block.optional(),
  banner: block.optional(),
  hero: block.optional(),
  blocks: block.array().default([]),
  cta: block.optional(),
  footer: block.optional(),
  pages: reference('pages').array().default([]),
})

export type Page = z.infer<typeof page>
