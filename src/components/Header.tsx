import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Menu, X } from 'lucide-react'
import { company, navigation } from '../data/site'
import { Logo } from './Logo'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen)
    if (!menuOpen) return

    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOutside)
    return () => {
      document.body.classList.remove('mobile-menu-open')
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [menuOpen])

  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isActive = (href: string) => {
    const destination = new URL(href, window.location.origin)
    const destinationPath = destination.pathname.replace(/\/+$/, '') || '/'
    return destinationPath === currentPath && destination.hash === '#top'
  }

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 960) setMenuOpen(false)
    }

    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="container header-inner" ref={menuRef}>
          <Logo />

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          id="header-menu"
          className={`header-menu${menuOpen ? ' header-menu--open' : ''}`}
        >
          <nav className="primary-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a
              className="header-careers"
              href={company.careers}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <BriefcaseBusiness size={16} aria-hidden="true" />
              Careers
            </a>
            <a className="button button--small" href="/#contact" onClick={() => setMenuOpen(false)}>
              Talk to our team
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        </div>
      </header>
    </>
  )
}
