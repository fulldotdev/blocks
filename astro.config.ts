import mdx from '@astrojs/mdx'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-blocks/integration/integration'

export default defineConfig({
  integrations: [
    liveCode({
      layout: '/src/components/Window.astro',
    }),
    integration({
      css: '/src/css/custom.css',
      colors: {
        theme: 'dark',
        dark: {
          background: '#131113',
          base: '#18191B',
          brand: '#EA512F',
        },
      },
    }),
    mdx(),
  ],
  experimental: {
    contentLayer: true,
    contentIntellisense: true,
  },
})
