import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sassDts from 'vite-plugin-sass-dts';

// for sassDts and css check https://www.npmjs.com/package/vite-plugin-sass-dts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts({
      enabledMode: ['development', 'production'],
      sourceDir: path.resolve(__dirname, './src'),
      outputDir: path.resolve(__dirname, './dist'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@views': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/" as common;`,
        importer(...args) {
          if (args[0] !== '@styles/') {
            return;
          }

          return {
            file: `${path.resolve(__dirname, './src/styles')}`,
          };
        },
      },
    },
  },
});
