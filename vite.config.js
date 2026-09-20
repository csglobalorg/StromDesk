import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        solutions: resolve(import.meta.dirname, 'solutions.html'),
        work: resolve(import.meta.dirname, 'work.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        insights: resolve(import.meta.dirname, 'insights.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});
