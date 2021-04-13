import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  root: path.join(process.cwd(), '/app/modules'),
  server: {
    middlewareMode: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    manifest: true,
  },
  plugins: [vue(), legacy({ targets: ['defaults', 'not IE 11'] })],
});
