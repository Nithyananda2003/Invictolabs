import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { PassThrough } from 'node:stream'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { PurgeCSS } from 'purgecss'
import { SiteRoutes, routeMetadata } from '../.ssr/main.js'

const template = await readFile('dist/index.html', 'utf8')
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'))
const escape = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
const entryFor = route => /^\/(blogs|case-studies)(\/|$)/.test(route) ? 'src/InsightsPage.tsx' : route.startsWith('/products') ? 'src/ProductsPage.tsx' : route.startsWith('/services/') ? 'src/ServiceDetailPage.tsx' : route === '/our-company' ? 'src/AboutPage.tsx' : route === '/faq' ? 'src/FaqPage.tsx' : route === '/' ? 'src/App.tsx' : 'src/OperationsPage.tsx'
function resources(key, seen = new Set()) {
  if (seen.has(key) || !manifest[key]) return []
  seen.add(key)
  const asset = manifest[key]
  return [ ...asset.css ?? [], ...(asset.imports ?? []).flatMap(child => resources(child, seen)) ]
}
function render(route) {
  return new Promise((resolve, reject) => {
    let html = ''
    const output = new PassThrough()
    output.on('data', chunk => { html += chunk })
    output.on('end', () => resolve(html))
    const stream = renderToPipeableStream(React.createElement(React.StrictMode, null,
      React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(SiteRoutes))), {
      onAllReady() { stream.pipe(output) }, onError: reject,
    })
  })
}
for (const [route, meta] of Object.entries(routeMetadata)) {
  const content = await render(route)
  const styles = [...new Set(resources(entryFor(route)))].filter(file => !template.includes(file)).map(file => `<link rel="stylesheet" href="/${file}">`).join('')
  const preload = manifest[entryFor(route)] ? `<link rel="modulepreload" href="/${manifest[entryFor(route)].file}">` : ''
  let html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    .replace(/<title>.*?<\/title>/s, `<title>${escape(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/s, `$1${escape(meta.description)}"`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/s, `$1${escape(meta.title)}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/s, `$1${escape(meta.description)}"`)
    .replace('href="https://invictolabs.com/"', `href="https://invictolabs.com${route}"`)
    .replace('</head>', `${styles}${preload}</head>`)
  // Inline only selectors used by this page. Keep full styles available for
  // interactive states and subsequent client-side routes; do not remove them.
  const stylesheetPattern = /<link\b[^>]*rel="stylesheet"[^>]*>/g
  const links = [...html.matchAll(stylesheetPattern)].map(match => match[0])
  const css = await Promise.all(links.map(async link => {
    const path = link.match(/href="\/?([^"]+)"/)[1]
    return { raw: await readFile(join('dist', path), 'utf8') }
  }))
  const critical = await new PurgeCSS().purge({ content: [{ raw: content, extension: 'html' }], css, safelist: ['html', 'body', ':root', 'header-menu--open', 'mobile-menu-open'], keyframes: false, fontFace: false })
  html = html.replace(stylesheetPattern, link => `${link.replace('rel="stylesheet"', 'rel="stylesheet" media="print" onload="this.media=\'all\'"')}<noscript>${link}</noscript>`)
    .replace('</head>', `<style data-critical>${critical.map(result => result.css).join('\n')}</style></head>`)
  const file = route === '/' ? 'dist/index.html' : join('dist', route.slice(1), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`Pre-rendered ${route}`)
}
