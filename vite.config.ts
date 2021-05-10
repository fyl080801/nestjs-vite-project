import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import { MODULE_PATH } from '@nestseed/common';

export default defineConfig({
  root: MODULE_PATH,
  server: {
    middlewareMode: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  plugins: [
    vue(),
    legacy({ targets: ['defaults', 'not IE 11'] }),
    createSvgSpritePlugin({ symbolId: 'icon-[name]' }),
  ],
});
