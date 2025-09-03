import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'esbuild', // use esbuild instead of terser
    sourcemap: false
  }
})
