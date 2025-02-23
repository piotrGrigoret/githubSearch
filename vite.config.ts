import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// import TsconfigPathsPlugin from 'vite-plugin-tsconfig-paths';
// import javascriptObfuscator from 'vite-plugin-javascript-obfuscator';
export default defineConfig({
  plugins: [
    react(),
    // TsconfigPathsPlugin(),
    // javascriptObfuscator({
    //   options: {
    //     compact: false,
    //     controlFlowFlattening: true,
    //     controlFlowFlatteningThreshold: 1,
    //     numbersToExpressions: true,
    //     simplify: true,
    //     stringArrayShuffle: true,
    //     splitStrings: true,
    //     stringArrayThreshold: 1,
    //     selfDefending: true,
    //     stringArray: true,
    //     stringArrayEncoding: ['base64'],
    //     unicodeEscapeSequence: true,
    //   },
    // }),
  ],
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      plugins: [],
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true
    }
  }
})