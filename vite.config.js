import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/tepeeya.github.io/',
  build: { target: 'es2020', sourcemap: false },
});
