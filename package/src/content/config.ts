import { defineCollection } from 'astro:content'
import { block } from '../schemas/block'
import { card } from '../schemas/card'
import { page } from '../schemas/page'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  posts: defineCollection({
    type: 'content',
    schema: page,
  }),
  products: defineCollection({
    type: 'content',
    schema: page,
  }),
  categories: defineCollection({
    type: 'content',
    schema: page,
  }),
  cards: defineCollection({
    type: 'data',
    schema: card,
  }),
  blocks: defineCollection({
    type: 'data',
    schema: block,
  }),
}
