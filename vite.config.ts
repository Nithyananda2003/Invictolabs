import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'about.html',
        'faq.html',
        '404.html',
        'home/index.html',
        'homepage/index.html',
        'company/index.html',
        'our-company/index.html',
        'ourcompany/index.html',
        'faq/index.html',
        'products/index.html',
        'product/index.html',
      ],
    },
  },
})
