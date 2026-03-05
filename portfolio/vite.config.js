import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/JHWebDev/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
