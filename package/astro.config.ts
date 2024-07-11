import yaml from '@rollup/plugin-yaml'
import { defineConfig } from 'astro/config'

export default defineConfig({
  vite: {
    plugins: [yaml()],
  },
})
