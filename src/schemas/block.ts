import type { ComponentProps, HTMLTag } from 'astro/types'
import { z } from 'astro:content'
import type { Heading, Image, Section } from 'fulldev-ui'
import { base } from './base'
import { card } from './card'
import { pathSchema } from './utils'

export const block = base
  .extend({
    cards: card.array(),
    columns: card.array(),
    pages: pathSchema('pages').array(),
    categories: pathSchema('categories').array(),
    products: pathSchema('products').array(),
    product: pathSchema('products'),
    posts: pathSchema('posts').array(),
    reviews: pathSchema('reviews').array(),
  })
  .partial()
  .passthrough()

export type Block<As extends HTMLTag> = z.infer<typeof base> &
  ComponentProps<typeof Section<As>> &
  Pick<ComponentProps<typeof Heading>, 'level'> &
  Pick<ComponentProps<typeof Image>, 'position'>
