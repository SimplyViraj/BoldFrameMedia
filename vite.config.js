import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['motion', 'react', 'react-dom'],
    esbuildOptions: {
      // Increase timeout for optimization
      target: 'es2020',
    },
  },
  build: {
    rollupOptions: {
      // Increase chunk size warning limit
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Increase HMR timeout
    hmr: {
      timeout: 30000,
    },
  },
})