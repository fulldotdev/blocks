import type { AstroIntegration } from 'astro'

export default function fulldevBlocksIntegration(): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({
        // config: astroConfig,
        updateConfig,
        injectScript,
        injectRoute,
      }) => {
        const pages = import.meta.glob('/src/pages/**/*.astro')

        !pages['/src/pages/404.astro'] &&
          injectRoute({
            pattern: '/404',
            entrypoint: 'fulldev-blocks/404.astro',
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
    },
  }
}
