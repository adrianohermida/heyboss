import { defineConfig, PluginOption } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { reactComponentTagger } from 'react-component-tagger';

export default defineConfig({
  plugins: [reactComponentTagger() as PluginOption, cloudflare()],
  build: {
    chunkSizeWarningLimit: 10240,
    rollupOptions: {
      external: ['stripe', 'jose'],
      output: {
        globals: {
          stripe: 'Stripe',
          jose: 'jose'
        }
      }
    }
  },
});
