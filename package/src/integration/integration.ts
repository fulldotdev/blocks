import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
// @ts-ignore
import yaml from 'js-yaml'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'
// @ts-ignore
import { fileURLToPath } from 'url'

export default function fulldevBlocksIntegration(): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({ injectRoute }) => {
        const pages = import.meta.glob('/src/pages/**/*.astro')
        !pages['/src/pages/404.astro'] &&
          injectRoute({
            pattern: '/404',
            entrypoint: 'fulldev-blocks/404.astro',
          })

        !pages['/src/pages/contact.astro'] &&
          injectRoute({
            pattern: '/contact',
            entrypoint: 'fulldev-blocks/contact.astro',
          })

        !pages['/src/pages/[...page].astro'] &&
          injectRoute({
            pattern: '/[...page]',
            entrypoint: 'fulldev-blocks/[...page].astro',
          })

        !pages['/src/pages/[categories]/[...category].astro'] &&
          injectRoute({
            pattern: '/[categories]/[...category]',
            entrypoint: 'fulldev-blocks/[categories]/[...category].astro',
          })

        !pages['/src/pages/[categories]/index.astro'] &&
          injectRoute({
            pattern: '/[categories]',
            entrypoint: 'fulldev-blocks/[categories]/index.astro',
          })

        !pages['/src/pages/[posts]/[...post].astro'] &&
          injectRoute({
            pattern: '/[posts]/[...post]',
            entrypoint: 'fulldev-blocks/[posts]/[...post].astro',
          })

        !pages['/src/pages/[posts]/index.astro'] &&
          injectRoute({
            pattern: '/[posts]',
            entrypoint: 'fulldev-blocks/[posts]/index.astro',
          })

        !pages['/src/pages/[products]/[...product].astro'] &&
          injectRoute({
            pattern: '/[products]/[...product]',
            entrypoint: 'fulldev-blocks/[products]/[...product].astro',
          })

        !pages['/src/pages/[products]/index.astro'] &&
          injectRoute({
            pattern: '/[products]',
            entrypoint: 'fulldev-blocks/[products]/index.astro',
          })
      },
      'astro:server:setup': async ({}) => {
        const cloudcannonLib = import.meta.glob('../../cloudcannon.config.ts')[
          '../../cloudcannon.config.ts'
        ] as any
        const cloudcannonUser = import.meta.glob('/cloudcannon.config.ts')[
          '/cloudcannon.config.ts'
        ] as any

        const merged = merge(
          cloudcannonLib ? (await cloudcannonLib()).default : {},
          cloudcannonUser ? (await cloudcannonUser()).default : {}
        )

        fs.writeFileSync(
          './.cloudcannon/cloudcannon.config.json',
          JSON.stringify(merged, null, 2)
        )
      },
      'astro:build:done': async () => {
        // ----------------------
        // Process cloudcannon config file
        // ----------------------
        const cloudcannonLib = import.meta.glob('../cloudcannon.config.yml', {
          as: 'raw',
          eager: true,
        })['../cloudcannon.config.yml']
        const cloudcannonUser = import.meta.glob('/cloudcannon.config.yml', {
          as: 'raw',
          eager: true,
        })['/cloudcannon.config.yml']

        const merged = merge(
          cloudcannonLib ? yaml.load(cloudcannonLib) : {},
          cloudcannonUser ? yaml.load(cloudcannonUser) : {}
        )

        const mergedYaml = yaml.dump(merged)
        fs.writeFileSync('./.cloudcannon/cloudcannon.config.yml', mergedYaml)

        // ----------------------
        // Process bookshop files
        // ----------------------
        const libBookshops = import.meta.glob(
          '../components/blocks/**/*.bookshop.yml',
          {
            as: 'raw',
            eager: true,
          }
        )
        const userBookshops = import.meta.glob(
          '/src/components/**/*.bookshop.yml',
          {
            as: 'raw',
            eager: true,
          }
        )

        Object.entries(libBookshops).map(async ([key, value]) => {
          const modifiedKey = key.replace(
            '../components/blocks/',
            '/src/components/'
          )
          const filename = modifiedKey.replace('/src/components/', '')

          if (userBookshops[modifiedKey]) {
            const libData = yaml.load(value)
            const userData = yaml.load(userBookshops[modifiedKey])
            const merged = { ...libData, ...userData }
            const mergedYaml = yaml.dump(merged)
            fs.writeFileSync(
              `./.cloudcannon/components/${filename}`,
              mergedYaml
            )
          } else {
            fs.writeFileSync(`./.cloudcannon/components/${filename}`, value)
          }
        })

        Object.entries(userBookshops).map(async ([key, value]) => {
          const modifiedKey = key.replace(
            '/src/components/',
            '../components/blocks/'
          )
          const filename = modifiedKey.replace('../components/blocks/', '')

          if (!userBookshops[modifiedKey]) {
            fs.writeFileSync(`./.cloudcannon/components/${filename}`, value)
          }
        })

        // ----------------------
        // Process bookshop previews
        // ----------------------

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const getAbsolutePath = (relativePath: any) =>
          path.resolve(__dirname, relativePath)

        const libPreviews = import.meta.glob(
          '../components/blocks/**/*.preview.png',
          {
            eager: true,
          }
        )

        const userPreviews = import.meta.glob(
          '/src/components/**/*.preview.png',
          {
            eager: true,
          }
        )

        Object.entries(libPreviews).forEach(([key, value]) => {
          const filename = key.replace('../components/blocks/', '')
          const absolutePath = getAbsolutePath(key)
          const fileContent = fs.readFileSync(absolutePath)
          fs.writeFileSync(`./.cloudcannon/components/${filename}`, fileContent)
        })

        Object.entries(userPreviews).forEach(([key, value]) => {
          const filename = key.replace('/src/components/', '')
          const absolutePath = getAbsolutePath(key)
          const fileContent = fs.readFileSync(absolutePath)
          fs.writeFileSync(`./.cloudcannon/components/${filename}`, fileContent)
        })
      },
    },
  }
}
