import {defineConfig} from 'vitest/config';
import {resolve} from 'path';
import react from '@vitejs/plugin-react-swc';
import {visualizer} from 'rollup-plugin-visualizer';
import {PluginOption} from 'vite';
import eslint from '@nabla/vite-plugin-eslint';
import postcssNest from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import tailwindcss from 'tailwindcss';


export default defineConfig(function () {
  return {
    define: {
      'process.env': process.env,
    },
    base: './',
    server: {
      port: 3000,
    },
    esbuild: {
      legalComments: 'none',
    },
    build: {
      emptyOutDir: true,
      target: browserslistToEsbuild(),
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: {
            reactVendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    plugins: [
      react({tsDecorators: true}),
      eslint(),
      visualizer({filename: './visualizer/index.html'}) as PluginOption,
    ],
    css: {
      modules: {
        generateScopedName: '[local]-[hash:base64:5]',
        localsConvention: 'dashes',
      },
      postcss: {
        plugins: [
          tailwindcss(),
          postcssNest(),
          postcssPresetEnv({
            stage: 3,
            autoprefixer: {
              flexbox: 'no-2009',
            },
          }),
        ],
      },
    },
    test: {
      include: ['src/**/*.{test, spec}.{js,jsx,ts,tsx}'],
      environment: 'jsdom',
      globals: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
});
