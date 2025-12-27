import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { splitVendorChunkPlugin } from 'vite';
import compress from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  // Ativa o Lightning CSS nativo do Vite 5+
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: { ie: 11 }, // Opcional: define compatibilidade
      drafts: {
        customMedia: true, // Permite CSS moderno
      }
    }
  },
  build: {
    cssMinify: 'lightningcss', // Minificação via Rust
    target: 'esnext',
    modulePreload: {
      polyfill: false, // Economiza bytes, assumimos browsers modernos
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['preact', '@preact/signals'],
        },
      },
    },
  },
  plugins: [
    preact(),
    splitVendorChunkPlugin(),
    ViteImageOptimizer({
      /* Otimização agressiva de imagens */
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { lossless: true },
      avif: { lossless: true },
    }),
    compress({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
});
