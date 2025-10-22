import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Fix for React Router paths on Vercel
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // 🔥 ensures /tasks & /api routes load correctly
  },
})
