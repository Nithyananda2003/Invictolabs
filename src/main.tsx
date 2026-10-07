import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
const HomePage = lazy(() => import('./App'))
const OperationsPage = lazy(() => import('./OperationsPage'))
const ServiceDetailPage = lazy(() => import('./ServiceDetailPage'))
import { serviceDetails } from './data/serviceDetails'
import { blogs, caseStudies } from './data/insights'
const AboutPage = lazy(() => import('./AboutPage'))
const FaqPage = lazy(() => import('./FaqPage'))
const InsightsPage = lazy(() => import('./InsightsPage'))
import NotFoundPage from './NotFoundPage'
const ProductsPage = lazy(() => import('./ProductsPage'))
const TraceQPage = lazy(() => import('./ProductsPage').then(module => ({ default: module.TraceQPage })))
const TitleFlowPage = lazy(() => import('./ProductsPage').then(module => ({ default: module.TitleFlowPage })))
const TaxFlowPage = lazy(() => import('./ProductsPage').then(module => ({ default: module.TaxFlowPage })))
import { RouteScrollManager } from './components/RouteScrollManager'
import './styles.css'
import './refinements.css'
import './site-polish.css'

const cleanRouteAliases: Record<string, string> = {
  '/locations': '/location',
  '/approach': '/our-approach',
  '/': '/',
  '/index.html': '/',
  '/home': '/',
  '/homepage': '/',
  '/home/index.html': '/',
  '/homepage/index.html': '/',
  '/about.html': '/our-company',
  '/company': '/our-company',
  '/ourcompany': '/our-company',
  '/company/index.html': '/our-company',
  '/ourcompany/index.html': '/our-company',
  '/our-company/index.html': '/our-company',
  '/faq.html': '/faq',
  '/faq/index.html': '/faq',
  '/product': '/products',
  '/product/index.html': '/products',
  '/products/index.html': '/products',
}


export const routeMetadata: Record<string, { title: string; description: string }> = {
  ...Object.fromEntries(blogs.map(item => [`/blogs/${item.slug}`, { title: `${item.title} | Invicto Journal`, description: item.intro }])),
  ...Object.fromEntries(caseStudies.map(item => [`/case-studies/${item.slug}`, { title: `${item.title} | Invicto Workflows`, description: item.intro }])),
  '/blogs': { title: 'Blogs | Invicto', description: 'Practical perspectives on title research, mortgage operations, and operations technology.' },
  '/case-studies': { title: 'Workflow Walkthroughs | Invicto', description: 'Explore illustrative operational workflows connecting Invicto services and technology.' },
  ...Object.fromEntries(serviceDetails.map(service => [`/services/${service.slug}`, { title: `${service.name} | Invicto`, description: service.intro }])),
  '/services': { title: 'Services | Invicto', description: 'Explore Invicto mortgage, title, tax, and MLS operational support.' },
  '/location': { title: 'Locations | Invicto', description: 'Connect with Invicto in Dallas and Bengaluru.' },
  '/our-approach': { title: 'Our Approach | Invicto', description: 'See how Invicto aligns people, processes, and delivery with your operations.' },
  '/products/traceq': { title: 'TraceQ | Invicto', description: 'Connect orders, people, production, quality review, and invoicing with TraceQ.' },
  '/products/titleflow-ai': { title: 'TitleFlow AI | Invicto', description: 'Explore AI-assisted title extraction, report preparation, and human-reviewed quality checks.' },
  '/products/tax-flow': { title: 'Tax Flow | Invicto', description: 'Retrieve available property-tax information using a parcel number, state, and county.' },
  '/': {
    title: 'Invicto | Mortgage & Title Operations Partner',
    description: 'Invicto is a nationwide operations partner for mortgage, title, tax, and MLS services.',
  },
  '/our-company': {
    title: 'Our Company | Invicto',
    description: 'Meet the leaders and operating team behind Invicto’s nationwide mortgage and title support.',
  },
  '/products': {
    title: 'Products | Invicto Operations Technology',
    description: 'Explore TraceQ, TitleFlow AI, and Tax Flow: operations management, AI-assisted title preparation and review, and property-tax retrieval.',
  },
  '/faq': {
    title: 'Client FAQ | Invicto',
    description: 'Clear answers about Invicto’s coverage, quality, workflow integration, and onboarding.',
  },
}


export function SiteRoutes() {
  const location = useLocation()
  const normalized = location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
  let path = cleanRouteAliases[normalized] ?? normalized
  let hash = location.hash === '#top' ? '' : location.hash
  const sectionRoutes: Record<string, string> = { '#services': '/services', '#locations': '/location', '#approach': '/our-approach' }
  if (path === '/' && sectionRoutes[hash]) {
    path = sectionRoutes[hash]
    hash = ''
  }
  const legacyProducts: Record<string, string> = { '#traceq': 'traceq', '#ai-quality': 'titleflow-ai', '#tax-flow': 'tax-flow' }
  if (path === '/products' && legacyProducts[hash]) {
    path = '/products/' + legacyProducts[hash]
    hash = ''
  }
  useEffect(() => {
    const metadata = routeMetadata[path] ?? { title: 'Page not found | Invicto', description: 'Explore Invicto services and products.' }
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    const canonical = new URL(path, 'https://invictolabs.com').href
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
  }, [path])
  if (path !== location.pathname || location.hash) return <Navigate replace to={path + location.search} state={{ ...location.state, scrollTarget: hash.slice(1) }} />
  return (
    <Suspense fallback={<div className="route-loading" role="status">Loading Invicto…</div>}><RouteScrollManager behavior="auto" locationKey={location.key} target={location.state?.scrollTarget ?? ''}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<OperationsPage key="services" kind="services" />} />
        {serviceDetails.map(service => <Route key={service.slug} path={`/services/${service.slug}`} element={<ServiceDetailPage key={service.slug} slug={service.slug} />} />)}
        <Route path="/location" element={<OperationsPage key="location" kind="location" />} />
        <Route path="/our-approach" element={<OperationsPage key="our-approach" kind="our-approach" />} />
        <Route path="/our-company" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blogs" element={<InsightsPage key="blogs" kind="blogs" />} />
        <Route path="/case-studies" element={<InsightsPage key="case-studies" kind="case-studies" />} />
        <Route path="/blogs/:slug" element={<InsightsPage key={location.pathname} kind="blogs" />} />
        <Route path="/case-studies/:slug" element={<InsightsPage key={location.pathname} kind="case-studies" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/traceq" element={<TraceQPage />} />
        <Route path="/products/titleflow-ai" element={<TitleFlowPage />} />
        <Route path="/products/tax-flow" element={<TaxFlowPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouteScrollManager></Suspense>
  )
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root')!
  const app = <StrictMode><BrowserRouter><SiteRoutes /></BrowserRouter></StrictMode>
  if (root.hasChildNodes()) hydrateRoot(root, app)
  else createRoot(root).render(app)
}
