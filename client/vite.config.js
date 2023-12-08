import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3800',
        changeOrigin: true,
        secure: false,
      },
      '/protected': {
        target: 'http://localhost:3800',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});