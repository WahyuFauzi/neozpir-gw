import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    solid(),
    tailwindcss()
  ],
  build: {
    target: 'esnext',
    outDir: 'dist', // 👈 Important for Cloudflare Pages
  },
  server: {
    proxy: {
      // Proxy /api requests to our Cloudflare Worker
      '/api': {
        target: 'http://localhost:8788', // Default wrangler port
        changeOrigin: true,
      },
    },
  },
})
