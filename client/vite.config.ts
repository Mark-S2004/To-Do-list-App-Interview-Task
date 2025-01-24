import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import alias from '@rollup/plugin-alias';
import * as path from 'path';

export const aliases = [
  {
    find: '@',
    replacement: path.resolve(__dirname, './src'),
  },
  {
    find: '@components',
    replacement: path.resolve(__dirname, './src/components'),
  },
  {
    find: '@enums',
    replacement: path.resolve(__dirname, './src/enums'),
  },
  {
    find: '@store',
    replacement: path.resolve(__dirname, './src/store'),
  },
  {
    find: '@interfaces',
    replacement: path.resolve(__dirname, './src/interfaces'),
  },
  {
    find: '@pages',
    replacement: path.resolve(__dirname, './src/pages'),
  },
  {
    find: '@hooks',
    replacement: path.resolve(__dirname, './src/hooks'),
  },
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
    entries: aliases
  }),
],
})
