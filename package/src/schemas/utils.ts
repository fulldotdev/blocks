import { reference, z, type AnyEntryMap } from 'astro:content'

export const pathSchema = <C extends keyof AnyEntryMap>(collection: C) =>
  z
    .string()
    .transform((value) => {
      const fullpath = value?.split(`${collection}/`).pop()
      const slug = fullpath?.split('.').shift()
      return slug
    })
    .pipe(reference(collection))
