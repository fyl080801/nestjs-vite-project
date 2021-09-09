import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import * as path from 'path';

const MODULE_PATH = path.join(process.cwd(), '/packages');

export default defineConfig({
  root: MODULE_PATH,
  server: {
    middlewareMode: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    fs: {
      strict: false,
    },
  },
  plugins: [
    vue(),
    legacy({ targets: ['defaults', 'not IE 11'] }),
    createSvgSpritePlugin({ symbolId: 'icon-[name]' }),
  ],
});
