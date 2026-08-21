import { useEffect, useRef } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { Blocks, Landmark, MapPinned, SearchCheck } from 'lucide-react'
import { services } from '../data/site'
import { SectionHeading } from './SectionHeading'
import { DotGrid } from './ui/DotGrid'

const icons = {
  search: SearchCheck,
  landmark: Landmark,
  map: MapPinned,
  blocks: Blocks,
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const deck = deckRef.current
    if (!section || !deck) return

    const cards = Array.from(deck.querySelectorAll<HTMLElement>('.service-card'))
    const deckMedia = window.matchMedia('(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)')
    let frame = 0

    const expandCards = () => {
      section.classList.remove('services--deck-ready')
      section.style.setProperty('--deck-progress', '1')
      cards.forEach((card) => {
        card.style.setProperty('--deck-x', '0px')
        card.style.setProperty('--deck-y', '0px')
        card.style.setProperty('--deck-rotate', '0deg')
        card.style.setProperty('--deck-scale', '1')
        card.style.removeProperty('z-index')
      })
      if (progressRef.current) progressRef.current.textContent = '04 / 04'
    }

    const updateDeck = () => {
      frame = 0
      if (!deckMedia.matches) {
        expandCards()
        return
      }

      section.classList.add('services--deck-ready')
      const stickyHeight = window.innerHeight - 82
      const travel = Math.max(1, section.offsetHeight - stickyHeight)
      const rawProgress = (82 - section.getBoundingClientRect().top) / travel
      const progress = Math.min(1, Math.max(0, rawProgress))
      const easedProgress = progress * progress * (3 - 2 * progress)
      const deckCenter = deck.clientWidth / 2

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const collapsedX = deckCenter - cardCenter
        const collapsedY = index * 9
        const collapsedRotation = (index - (cards.length - 1) / 2) * 2.6
        const collapsedScale = 1 - index * 0.012
        const remaining = 1 - easedProgress

        card.style.setProperty('--deck-x', `${collapsedX * remaining}px`)
        card.style.setProperty('--deck-y', `${collapsedY * remaining}px`)
        card.style.setProperty('--deck-rotate', `${collapsedRotation * remaining}deg`)
        card.style.setProperty('--deck-scale', `${1 - (1 - collapsedScale) * remaining}`)
        card.style.zIndex = `${cards.length - index}`
      })

      section.style.setProperty('--deck-progress', `${progress}`)
      const currentCard = Math.min(cards.length, Math.floor(progress * cards.length) + 1)
      if (progressRef.current) progressRef.current.textContent = `0${currentCard} / 04`
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDeck)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    deckMedia.addEventListener('change', requestUpdate)
    requestUpdate()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      deckMedia.removeEventListener('change', requestUpdate)
    }
  }, [])

  const moveSpotlight = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <section ref={sectionRef} className="section services" id="services" aria-labelledby="services-heading">
      <div className="services-stage">
        <div className="services-dot-grid" aria-hidden="true">
          <DotGrid
            dotSize={3}
            gap={26}
            baseColor="#c4cee9"
            activeColor="#3159e8"
            proximity={140}
            speedTrigger={135}
            shockRadius={220}
            shockStrength={2.2}
            resistance={900}
            returnDuration={1.2}
          />
        </div>
        <div className="container">
          <div className="section-intro">
            <SectionHeading
              id="services-heading"
              eyebrow="What we do"
              title="One partner across your operation."
              description="Purpose-built support for the work behind every confident decision and successful closing."
            />
            <div className="services-meta">
              <span className="services-meta__signal"><i /> Four connected capabilities</span>
              <p className="section-index" aria-hidden="true">01 — 04</p>
            </div>
          </div>

          <div className="service-grid" ref={deckRef}>
            {services.map((service, index) => {
              const Icon = icons[service.icon as keyof typeof icons]
              return (
                <article
                  className="service-card"
                  key={service.title}
                  onPointerMove={moveSpotlight}
                  style={{ '--card-delay': `${index * 90}ms` } as CSSProperties}
                >
                  <div className="service-card__head">
                    <div className="icon-tile icon-tile--light"><Icon size={23} /></div>
                    <span>{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="service-card__status">
                    <span>Designed for integration</span>
                    <i aria-hidden="true"><b /></i>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="services-deck-progress" aria-hidden="true">
            <span>Scroll to expand</span>
            <i><b /></i>
            <span ref={progressRef}>01 / 04</span>
          </div>
        </div>
      </div>
    </section>
  )
}
