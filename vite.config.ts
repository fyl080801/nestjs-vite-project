import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  build: {
    manifest: true,
  },
  server: {
    middlewareMode: true,
  },
  root: path.resolve(process.cwd(), 'app/modules'),
  // resolve: {
  //   alias: [
  //     {
  //       find: '@/',
  //       replacement: `${path.resolve(process.cwd(), '/')}/`,
  //     },
  //   ],
  // },
  plugins: [vue(), legacy({ targets: ['defaults', 'not IE 11'] })],
});
