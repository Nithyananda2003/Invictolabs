import { useEffect, useRef } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { ArrowRight, Layers3, ShieldCheck, Workflow } from 'lucide-react'
import { benefits, partnershipProofs } from '../data/site'
import { SectionHeading } from './SectionHeading'
import { DotGrid } from './ui/DotGrid'

const icons = {
  workflow: Workflow,
  shield: ShieldCheck,
  layers: Layers3,
}

export function Partnership() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    section.classList.add('partnership--motion-ready')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('partnership--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.28 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const moveSpotlight = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <section ref={sectionRef} className="section partnership" id="partnership" aria-labelledby="partnership-heading">
      <div className="partnership-dot-grid" aria-hidden="true">
        <DotGrid
          dotSize={2.2}
          gap={31}
          baseColor="#cbd2e4"
          activeColor="#3159e8"
          proximity={120}
          speedTrigger={120}
          shockRadius={190}
          shockStrength={1.7}
          resistance={900}
          returnDuration={1.35}
        />
      </div>

      <div className="container partnership-shell">
        <div className="partnership-head">
          <SectionHeading
            id="partnership-heading"
            eyebrow="Why Invicto"
            title="Built to protect speed, accuracy, and closing confidence."
            description="Operational capacity for title and mortgage teams that need to scale without giving up control."
          />
          <div className="partnership-head__note">
            <span><i /> Built for U.S. title operations</span>
            <p>Dallas-led partnership. Bengaluru delivery strength. One connected operating rhythm.</p>
          </div>
        </div>

        <div className="partnership-board">
          <article className="partnership-feature">
            <div className="partnership-feature__topline">
              <span><i /> Delivery network active</span>
              <span>24 / 7</span>
            </div>
            <div>
              <p className="partnership-feature__eyebrow">The capacity promise</p>
              <h3>Scale capacity. Preserve quality. Say yes to growth.</h3>
              <p>Current-owner, two-owner, full, and update search support—delivered inside the workflow your team already uses.</p>
            </div>
            <div className="partnership-flow" aria-label="Search, human review, and client-ready workflow">
              <span>Search</span><i><b /></i>
              <span>Human review</span><i><b /></i>
              <span>Client-ready</span>
            </div>
          </article>

          <div className="benefit-grid">
            {benefits.map((benefit, index) => {
              const Icon = icons[benefit.icon as keyof typeof icons]
              return (
                <article
                  key={benefit.title}
                  onPointerMove={moveSpotlight}
                  style={{ '--benefit-delay': `${160 + index * 90}ms` } as CSSProperties}
                >
                  <span className="benefit-check"><Icon size={20} strokeWidth={1.8} /></span>
                  <div>
                    <p className="benefit-kicker">{benefit.kicker}</p>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                  <span className="benefit-number">0{index + 1}</span>
                </article>
              )
            })}
          </div>
        </div>

        <div className="signal-band" aria-label="Invicto company and operating facts">
          {partnershipProofs.map((proof, index) => (
            <div key={proof.label}>
              <strong>{proof.value}</strong>
              <span>{proof.label}</span>
              {index === 0 && <small>Title search</small>}
            </div>
          ))}
          <a href="#contact" aria-label="Talk with Invicto">
            <ArrowRight size={19} />
          </a>
        </div>
      </div>
    </section>
  )
}
