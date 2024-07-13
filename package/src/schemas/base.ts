import { z } from 'astro:content'

export const button = z
  .object({
    text: z.string(),
    href: z.string(),
    icon: z.string(),
  })
  .partial()
  .passthrough()

export const link = z
  .object({
    text: z.string(),
    href: z.string(),
  })
  .partial()
  .passthrough()

export const base = z
  .object({
    tagline: z.string(),
    icon: z.string(),
    badge: z.string(),
    heading: z.string(),
    text: z.string(),
    html: z.string(),
    image: z.string(),
    images: z.string().array(),
    rating: z.number(),
    button: button,
    buttons: button.array(),
    link: link,
    links: link.array(),
    list: z.string().array(),
    avatar: z.string(),
    price: z.number(),
    input: z
      .object({
        placeholder: z.string(),
        submit: z.string(),
      })
      .partial()
      .passthrough(),
    logos: z.string().array(),
    logo: z.string(),
  })
  .partial()
  .passthrough()
