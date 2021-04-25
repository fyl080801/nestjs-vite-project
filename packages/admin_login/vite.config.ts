import { defineConfig } from 'vite';
import base from '../../vite.config';

export default defineConfig({
  ...base,
  root: __dirname,
  build: {
    outDir: './dist/ui',
    assetsDir: 'admin_login/static',
  },
});
