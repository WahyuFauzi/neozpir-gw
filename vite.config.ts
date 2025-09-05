import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig({
  plugins: [solid(), tailwindcss(), cloudflare()],
  build: {
    target: 'esnext',
    outDir: 'dist', // 👈 Important for Cloudflare Pages
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/sitemap.xml': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
});
