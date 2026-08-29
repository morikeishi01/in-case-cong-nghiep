import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: '.',
  base: mode === 'github-pages' ? '/in-case-cong-nghiep/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}));
