import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,          // describe/it without imports
    environment: 'jsdom',   // DOM for React components
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['app/orders/**/*.{ts,tsx}']
    }
  }
});
