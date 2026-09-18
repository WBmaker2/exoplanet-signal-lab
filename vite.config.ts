import { defineConfig } from 'vite';

// Sub-path safe: relative asset URLs so a repository sub-directory deploy keeps working.
export default defineConfig({
  base: './',
  server: { port: 5173 },
  preview: { port: 4173 },
  build: { target: 'es2020', sourcemap: false },
});
