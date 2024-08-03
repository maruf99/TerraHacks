import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import mix, { vercelAdapter, type Adapter } from 'vite-plugin-mix'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

interface MixConfig {
  handler: string
  adapter?: Adapter | undefined
}

type MixPlugin = (config: MixConfig) => Plugin

interface Mix {
  default: MixPlugin
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), (mix as unknown as Mix).default({
    handler: './src/server.ts',
    adapter: vercelAdapter(),
  })],
});
