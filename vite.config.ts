import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { reactComponentTagger } from 'react-component-tagger';

export default defineConfig({
  plugins: [
    react(),
    reactComponentTagger() as PluginOption,
    // DEBUG: logar arquivos CSS importados/hot-reload
    {
      name: 'log-css-imports',
      handleHotUpdate({ file }) {
        if (file.endsWith('.css') || file.endsWith('.scss')) {
          // eslint-disable-next-line no-console
          console.log('[VITE][CSS] Atualizado:', file);
        }
      }
    }
  ],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    chunkSizeWarningLimit: 10240,
    rollupOptions: {
      external: ['stripe'],
      output: {
        globals: {
          stripe: 'Stripe'
        }
      }
    }
  },
});

