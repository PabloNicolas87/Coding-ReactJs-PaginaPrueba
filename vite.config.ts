import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    globals: true,
    include: ['src/**/*.test.ts?(x)', 'src/tests/**/*.test.ts?(x)', '**/*.test.ts?(x)']
  }
});
