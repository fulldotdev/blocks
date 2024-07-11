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
        // injectRoute({
        //   // Use Astro’s pattern syntax for dynamic routes.
        //   pattern: '/[...page].astro',
        //   // Use relative path syntax for a local route.
        //   entrypoint: '../pages/[...page].astro',
        // })
        console.log('ready to inject')
        injectRoute({
          pattern: '/404',
          entrypoint: 'fulldev-blocks/404.astro',
        })
        injectRoute({
          pattern: '/[...page]',
          entrypoint: 'fulldev-blocks/[...page].astro',
        })
      },
    },
  }
}
