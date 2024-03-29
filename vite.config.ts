//@ts-nocheck
import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupReplace from '@rollup/plugin-replace';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // global: 'window',
    'process.env': {},
  },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        // 'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis', //<-- AWS SDK
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          '@remix-run/router': path.resolve(
            __dirname,
            '../../packages/router/index.ts'
          ),
          'react-router': path.resolve(
            __dirname,
            '../../packages/react-router/index.ts'
          ),
          'react-router-dom': path.resolve(
            __dirname,
            '../../packages/react-router-dom/index.tsx'
          ),
          './runtimeConfig': './runtimeConfig.browser',
        },
      }
    : {
        alias: {
          './runtimeConfig': './runtimeConfig.browser',
        },
      },
});
