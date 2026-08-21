import { ArrowUpRight } from 'lucide-react'
import { company, navigation } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo inverse />
          <p>Your all-in-one outsourcing partner for mortgage, title, tax, and MLS services across the nation.</p>
        </div>
        <div className="footer-nav">
          <p>Explore</p>
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-nav">
          <p>Connect</p>
          <a href={`mailto:${company.email}`}>Email us</a>
          <a href={company.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Invicto. All rights reserved.</span>
        <a href="/#top" aria-label="Return to the Invicto homepage">Back to homepage ↑</a>
      </div>
    </footer>
  )
}
