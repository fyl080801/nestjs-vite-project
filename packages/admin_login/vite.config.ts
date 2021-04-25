import { defineConfig } from 'vite';
import * as path from 'path';
import imp from 'vite-plugin-imp';
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
    outDir: path.resolve(__dirname, 'dist/ui'),
    assetsDir: 'admin_login/static',
  },
  plugins: [
    imp({
      libList: [
        {
          libName: 'ant-design-vue',
          style(name) {
            if (/popconfirm/.test(name)) {
              return `ant-design-vue/es/popover/style/index.css`;
            }
            return `ant-design-vue/es/${name}/style/index.css`;
          },
        },
      ],
    }),
  ],
});
