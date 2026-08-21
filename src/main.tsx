import { StrictMode, useEffect, useRef, useState, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import HomePage from './App'
import AboutPage from './AboutPage'
import FaqPage from './FaqPage'
import NotFoundPage from './NotFoundPage'
import ProductsPage from './ProductsPage'
import { RouteScrollManager } from './components/RouteScrollManager'
import './styles.css'

const cleanRouteAliases: Record<string, string> = {
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

const pages: Record<string, ComponentType> = {
  '/': HomePage,
  '/our-company': AboutPage,
  '/products': ProductsPage,
  '/faq': FaqPage,
}

const routeMetadata: Record<string, { title: string; description: string }> = {
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
    description: 'Explore TraceQ and Invicto’s developing AI-assisted quality workflow for title-search operations.',
  },
  '/faq': {
    title: 'Client FAQ | Invicto',
    description: 'Clear answers about Invicto’s coverage, quality, workflow integration, and onboarding.',
  },
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/'
}

function canonicalizePathname(pathname: string) {
  const normalized = normalizePathname(pathname)
  return cleanRouteAliases[normalized.toLowerCase()] ?? normalized
}

function canonicalUrl(destination: URL) {
  const next = new URL(destination.href)
  next.pathname = canonicalizePathname(next.pathname)
  return next
}

function placePageAtHash(hash: string) {
  let id = ''
  if (hash && hash !== '#') {
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      id = hash.slice(1)
    }
  }
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }

  const target = document.getElementById(id)
  if (!target) return
  const headerOffset = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 82
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
}

const initialUrl = canonicalUrl(new URL(window.location.href))
const initialPath = canonicalizePathname(initialUrl.pathname)

if (`${initialUrl.pathname}${initialUrl.search}${initialUrl.hash}` !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
  window.history.replaceState(null, '', `${initialUrl.pathname}${initialUrl.search}${initialUrl.hash}`)
}

type NavigationLocation = {
  behavior: ScrollBehavior
  key: string
  routePath: string
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown
}

function SiteRouter() {
  const navigationId = useRef(0)
  const renderedPath = useRef(initialPath)
  const [location, setLocation] = useState<NavigationLocation>({
    behavior: 'auto',
    key: `${initialUrl.pathname}${initialUrl.search}${initialUrl.hash}`,
    routePath: initialPath,
  })

  useEffect(() => {
    const navigate = (destination: URL, behavior: ScrollBehavior, pushHistory: boolean) => {
      const nextUrl = canonicalUrl(destination)
      const nextPath = canonicalizePathname(nextUrl.pathname)
      if (!pages[nextPath]) return false

      const nextLocation = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
      const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`
      const changesPage = nextPath !== renderedPath.current

      const commit = () => {
        if (pushHistory && nextLocation !== currentLocation) {
          window.history.pushState(null, '', nextLocation)
        } else if (!pushHistory && nextLocation !== currentLocation) {
          window.history.replaceState(null, '', nextLocation)
        }

        navigationId.current += 1
        flushSync(() => {
          setLocation({
            behavior: changesPage ? 'auto' : behavior,
            key: `${nextLocation}:${navigationId.current}`,
            routePath: nextPath,
          })
        })
        renderedPath.current = nextPath

        if (changesPage) placePageAtHash(nextUrl.hash)
      }

      const transitionDocument = document as ViewTransitionDocument
      if (changesPage && transitionDocument.startViewTransition) {
        transitionDocument.startViewTransition(commit)
      } else {
        commit()
      }

      return true
    }

    const handleInternalLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return

      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin || !pages[canonicalizePathname(destination.pathname)]) return

      event.preventDefault()
      navigate(destination, 'smooth', true)
    }

    const handleHistoryNavigation = () => {
      navigate(new URL(window.location.href), 'auto', false)
    }

    document.addEventListener('click', handleInternalLink)
    window.addEventListener('popstate', handleHistoryNavigation)

    return () => {
      document.removeEventListener('click', handleInternalLink)
      window.removeEventListener('popstate', handleHistoryNavigation)
    }
  }, [])

  useEffect(() => {
    const metadata = routeMetadata[location.routePath]
    if (!metadata) return

    document.title = metadata.title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', location.routePath)
  }, [location.routePath])

  const Page = pages[location.routePath] ?? NotFoundPage

  return (
    <RouteScrollManager behavior={location.behavior} locationKey={location.key}>
      <Page />
    </RouteScrollManager>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteRouter />
  </StrictMode>,
)
