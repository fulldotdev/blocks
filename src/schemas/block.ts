import type { ComponentProps, HTMLTag } from 'astro/types'
import { z } from 'astro:content'
import type { Heading, Image, Section } from 'fulldev-ui'
import { base } from './base'
import { card } from './card'
import { pathSchema } from './utils'

export const block = base
  .extend({
    columns: card.array(),
    cards: z.array(card.or(pathSchema('cards'))),
    pages: pathSchema('pages').array(),
    page: pathSchema('pages'),
    block: pathSchema('blocks'),
    posts: pathSchema('posts').array(),
    reviews: pathSchema('reviews').array(),
    review: base,
    features: base.array(),
  })
  .partial()
  .passthrough()

export type Block<As extends HTMLTag> = z.infer<typeof base> &
  ComponentProps<typeof Section<As>> &
  Pick<ComponentProps<typeof Heading>, 'level'> &
  Pick<ComponentProps<typeof Image>, 'position'>
