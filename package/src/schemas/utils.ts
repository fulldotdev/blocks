import { reference, z } from 'astro:content'

export const pagesPath = z
  .string()
  .transform((value) => {
    const fullpath = value?.split(`pages/`).pop()
    const slug = fullpath?.split('.').shift()
    return slug
  })
  .pipe(reference('pages'))

// export const pathSchema = <C extends keyof AnyEntryMap>(collection: C) =>
//   z
//     .string()
//     .transform((value) => {
//       const fullpath = value?.split(`${collection}/`).pop()
//       const slug = fullpath?.split('.').shift()
//       return slug
//     })
//     .pipe(reference(collection))
