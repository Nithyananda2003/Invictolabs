import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react(), {
  name: 'missing-agent-catalog',
  configureServer(server) {
    server.middlewares.use('/.well-known/ai-catalog.json', (_req, res) => { res.statusCode = 404; res.end('Not found') })
  },
  configurePreviewServer(server) {
    server.middlewares.use('/.well-known/ai-catalog.json', (_req, res) => { res.statusCode = 404; res.end('Not found') })
    const routes = new Set(['/our-company', '/faq', '/products', '/products/traceq', '/products/titleflow-ai', '/products/tax-flow', '/services', '/services/title', '/services/mortgage', '/services/tax-property', '/services/technology', '/location', '/our-approach'])
    server.middlewares.use((req, _res, next) => {
      const path = req.url?.split('?')[0].replace(/\/$/, '')
      if (path && (routes.has(path) || /^\/(blogs|case-studies)(\/[^/]+)?$/.test(path))) req.url = `${path}/index.html`
      next()
    })
  },
}] })
