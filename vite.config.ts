import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ROCK-PAPER-SCISSORS/', // Replace 'REPOSITORY-NAME' with your actual GitHub repo name
  optimizeDeps: {
    exclude: ['lucide-react'], // Keeps 'lucide-react' from pre-bundling if causing issues
  },
  build: {
    outDir: 'dist', // Ensures build output goes into 'dist' folder
    sourcemap: true, // Useful for debugging production errors
  },
});
