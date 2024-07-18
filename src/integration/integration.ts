import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import virtual from 'vite-plugin-virtual'
// @ts-ignore
import yaml from 'js-yaml'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'
// @ts-ignore
import { fileURLToPath } from 'url'
import { generateRadixColors } from './generate-colors'

interface Config {
  css?: string
  colors?: Parameters<typeof generateRadixColors>[0]
}

export default function fulldevBlocksIntegration(
  userConfig: Config
): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({
        injectRoute,
        injectScript,
        updateConfig,
      }) => {
        // ----------------------
        // Inject css
        // ----------------------
        userConfig?.css &&
          injectScript('page-ssr', `import "${userConfig?.css}";`)

        if (userConfig?.colors) {
          const generated = generateRadixColors(userConfig?.colors)
          const base = generated.grayScale
            .map((color, i) => `--base-${i + 1}: ${color};`)
            .join('\n')
          const brand = generated.accentScale.map(
            (color, i) => `--brand-${i + 1}: ${color};`
          )
          const accentContrast = `--accent-contrast: ${generated.accentContrast};`
          const css = `:root {\n${base}\n${brand.join('\n')}\n${accentContrast}
}`

          updateConfig({
            vite: {
              plugins: [
                virtual({
                  'virtual:colors.css': css,
                }) as any,
              ],
            },
          })
        }

        injectScript('page-ssr', `import "virtual:colors.css";`)

        // ----------------------
        // Inject pages
        // ----------------------
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
      'astro:build:done': async () => {
        // ----------------------
        // Process cloudcannon config file
        // ----------------------
        const configs = import.meta.glob(
          ['../../cloudcannon.config.yml', '/cloudcannon.config.yml'],
          { as: 'raw', eager: true }
        )
        const libConfig = configs['../blocks/cloudcannon.config.yml']
        const userConfig = configs['/cloudcannon.config.yml']
        const libData = libConfig ? yaml.load(libConfig) : {}
        const userData = userConfig ? yaml.load(userConfig) : {}
        const mergedData = merge(libData, userData)
        const mergedYaml = yaml.dump(mergedData)
        fs.writeFileSync('./.cloudcannon/cloudcannon.config.yml', mergedYaml)

        console.log([libConfig, userConfig, libData])

        // ----------------------
        // Process bookshop files
        // ----------------------
        const blocks = import.meta.glob(
          ['../blocks/**/*.yml', '/src/blocks/**/*.yml'],
          { as: 'raw', eager: true }
        )
        Object.entries(blocks).forEach(async ([key, value]) => {
          const filename = key.split('/').pop()
          fs.writeFileSync(`./.cloudcannon/blocks/${filename}`, value)
        })

        // ----------------------
        // Process cloudcannon schema files
        // ----------------------
        const schemas = import.meta.glob(
          [
            '../schemas/**/*.md',
            '../schemas/**/*.yml',
            '/src/schemas/**/*.md',
            '/src/schemas/**/*.yml',
          ],
          { as: 'raw', eager: true }
        )

        Object.entries(schemas).forEach(async ([key, value]) => {
          const filename = key.split('/').pop()
          fs.writeFileSync(`./.cloudcannon/schemas/${filename}`, value)
        })

        // ----------------------
        // Process bookshop previews
        // ----------------------
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const getAbsolutePath = (relativePath: any) =>
          path.resolve(__dirname, relativePath)

        const libPreviews = import.meta.glob('../blocks/**/*.preview.png', {
          eager: true,
        })

        const userPreviews = import.meta.glob('/src/blocks/**/*.preview.png', {
          eager: true,
        })

        Object.entries(libPreviews).forEach(([key, value]) => {
          const filename = key.split('/').pop()
          const absolutePath = getAbsolutePath(key)
          const fileContent = fs.readFileSync(absolutePath)
          fs.writeFileSync(`./.cloudcannon/blocks/${filename}`, fileContent)
        })

        Object.entries(userPreviews).forEach(([key, value]) => {
          const filename = key.split('/').pop()
          const absolutePath = getAbsolutePath(key)
          const fileContent = fs.readFileSync(absolutePath)
          fs.writeFileSync(`./.cloudcannon/blocks/${filename}`, fileContent)
        })
      },
    },
  }
}
