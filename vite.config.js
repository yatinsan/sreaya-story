import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages serves the site from https://<user>.github.io/sreaya-story/
  base: command === 'serve' && !isPreview ? '/' : '/sreaya-story/',
}));
