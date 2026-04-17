import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@tensorflow-models/pose-detection': path.resolve(
        __dirname,
        'node_modules/@tensorflow-models/pose-detection/dist/index.js'
      ),
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: ['codesena.totalchaos.online']
  }
})