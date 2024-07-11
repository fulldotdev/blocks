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
      },
    },
  }
}
