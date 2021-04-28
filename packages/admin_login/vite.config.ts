import { mergeConfig } from 'vite';
import * as path from 'path';
import base from '../../vite.config';
import styleImport from 'vite-plugin-style-import';

export default mergeConfig(base, {
  root: path.resolve(__dirname, '../'),
  resolve: {
    alias: { '/admin_login/src/main.ts': './src/main.ts' },
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
  plugins: [
    styleImport({
      root: path.resolve(__dirname, '../../'),
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
});
