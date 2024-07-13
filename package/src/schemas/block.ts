import type { ComponentProps, HTMLTag } from 'astro/types'
import { z } from 'astro:content'
import type { Heading, Image, Section } from 'fulldev-ui'
import { base } from './base'
import { card } from './card'
import { pathSchema } from './utils'

export const block = base
  .extend({
    cards: card.array(),
    pages: pathSchema('pages').array(),
    categories: pathSchema('categories').array(),
    products: pathSchema('products').array(),
    posts: pathSchema('posts').array(),
  })
  .partial()
  .passthrough()

export type Block<As extends HTMLTag> = z.infer<typeof block> &
  ComponentProps<typeof Section<As>> &
  Pick<ComponentProps<typeof Heading>, 'level'> &
  Pick<ComponentProps<typeof Image>, 'position'>
