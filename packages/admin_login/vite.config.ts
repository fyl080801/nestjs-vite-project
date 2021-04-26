import { defineConfig } from 'vite';
import * as path from 'path';
import base from '../../vite.config';

export default defineConfig({
  ...base,
  root: path.resolve(__dirname, '../'),
  resolve: {
    alias: { './admin_login/src/main.ts': './src/main.ts' },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    outDir: path.resolve(__dirname, 'dist'),
    assetsDir: 'admin_login/static',
  },
});
