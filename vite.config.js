import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: false,   // disable source maps for production
    minify: 'terser',   // minify JS/CSS
  }
})
