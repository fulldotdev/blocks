import { defineCollection } from 'astro:content'
import { block } from '../schemas/block'
import { page } from '../schemas/page'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  blocks: defineCollection({
    type: 'data',
    schema: block,
  }),
}
