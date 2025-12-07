import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        // 在構建完成後創建 .nojekyll 文件，禁用 GitHub Pages 的 Jekyll
        writeFileSync(join(__dirname, 'dist', '.nojekyll'), '')
      }
    }
  ],
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
