import type { ComponentProps, HTMLTag } from 'astro/types'
import { reference, z } from 'astro:content'
import type { Heading, Image, Section } from 'fulldev-ui'
import { base } from './base'
import { card } from './card'

export const block = base.extend({
  cards: card.array().default([]),
  pages: reference('pages').array().default([]),
})

export type Block<As extends HTMLTag> = z.infer<typeof block> &
  ComponentProps<typeof Section<As>> &
  Pick<ComponentProps<typeof Heading>, 'level'> &
  Pick<ComponentProps<typeof Image>, 'position'>
