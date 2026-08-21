import { useEffect, useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileInput,
  Gauge,
  Layers3,
  ReceiptText,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from 'lucide-react'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { DottedSurface } from './components/ui/DottedSurface'
import { GridBoxBackground } from './components/ui/GridBoxBackground'
import { MagicRings } from './components/ui/MagicRings'

const workflowStages = ['Order intake', 'Assignment', 'Production', 'Quality review', 'Invoice ready']

const traceQCapabilities = [
  { icon: FileInput, title: 'Order placement', description: 'Bring title-search orders into one structured operating queue.' },
  { icon: Layers3, title: 'Workflow levels', description: 'Define stages, ownership, handoffs, and review checkpoints.' },
  { icon: UsersRound, title: 'Workforce tracking', description: 'Connect assignments and employee activity to active production.' },
  { icon: Gauge, title: 'Productivity visibility', description: 'See how work moves without relying on disconnected trackers.' },
  { icon: ClipboardCheck, title: 'Quality oversight', description: 'Keep review status and workflow exceptions visible before delivery.' },
  { icon: ReceiptText, title: 'Invoice generation', description: 'Carry completed activity into an organized billing workflow.' },
]

export default function ProductsPage() {
  const revealRef = useRef<HTMLElement>(null)
  const revealStageRef = useRef<HTMLDivElement>(null)
  const productDeckRef = useRef<HTMLDivElement>(null)
  const revealProgressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = revealRef.current
    const stage = revealStageRef.current
    const deck = productDeckRef.current
    if (!section || !stage || !deck) return

    const cards = Array.from(deck.querySelectorAll<HTMLElement>('.product-reveal-card'))
    const revealMedia = window.matchMedia('(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)')
    let frame = 0

    const showExpanded = () => {
      section.classList.remove('product-reveal-v3--deck-ready')
      section.style.setProperty('--product-reveal-progress', '1')
      cards.forEach((card) => {
        card.style.setProperty('--product-card-x', '0px')
        card.style.setProperty('--product-card-y', '0px')
        card.style.setProperty('--product-card-rotate', '0deg')
        card.style.setProperty('--product-card-scale', '1')
        card.style.removeProperty('z-index')
      })
      if (revealProgressRef.current) revealProgressRef.current.textContent = 'OPEN'
    }

    const updateDeck = () => {
      frame = 0
      if (!revealMedia.matches) {
        showExpanded()
        return
      }

      section.classList.add('product-reveal-v3--deck-ready')
      const stickyOffset = 82
      const stickyHeight = window.innerHeight - stickyOffset
      const travel = Math.max(1, section.offsetHeight - stickyHeight)
      const rawProgress = (stickyOffset - section.getBoundingClientRect().top) / travel
      const progress = Math.min(1, Math.max(0, rawProgress))
      const easedProgress = progress * progress * (3 - 2 * progress)
      const remaining = 1 - easedProgress
      const deckCenter = deck.clientWidth / 2

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const collapsedX = deckCenter - cardCenter
        const collapsedY = index * 14
        const collapsedRotation = (index - (cards.length - 1) / 2) * 3.4
        const collapsedScale = 1 - index * 0.025

        card.style.setProperty('--product-card-x', `${collapsedX * remaining}px`)
        card.style.setProperty('--product-card-y', `${collapsedY * remaining}px`)
        card.style.setProperty('--product-card-rotate', `${collapsedRotation * remaining}deg`)
        card.style.setProperty('--product-card-scale', `${1 - (1 - collapsedScale) * remaining}`)
        card.style.zIndex = `${cards.length - index}`
      })

      section.style.setProperty('--product-reveal-progress', `${progress}`)
      if (revealProgressRef.current) {
        revealProgressRef.current.textContent = progress > 0.96 ? 'OPEN' : `${Math.round(progress * 100).toString().padStart(2, '0')}%`
      }
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDeck)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    revealMedia.addEventListener('change', requestUpdate)
    requestUpdate()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      revealMedia.removeEventListener('change', requestUpdate)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="products-page products-v2" id="main-content">
        <section className="product-hero-v3" id="top" aria-labelledby="products-heading">
          <div className="product-hero-v3__rings" aria-hidden="true">
            <MagicRings
              color="#173fd8"
              colorTwo="#7c97ff"
              ringCount={8}
              speed={0.54}
              attenuation={12}
              lineThickness={1.65}
              baseRadius={0.19}
              radiusStep={0.073}
              scaleRate={0.1}
              opacity={0.58}
              noiseAmount={0.018}
              rotation={-12}
              ringGap={1.16}
              fadeIn={0.68}
              fadeOut={0.5}
              followMouse
              mouseInfluence={0.075}
              hoverScale={1.045}
              parallax={0.016}
              clickBurst
            />
          </div>
          <div className="product-hero-v3__wash" aria-hidden="true" />

          <div className="container product-hero-v3__inner">
            <p className="eyebrow"><span /> Invicto product systems</p>
            <h1 id="products-heading">Technology built around the work.</h1>
            <p>
              One platform organizes title-search operations today. One developing quality layer is designed to make tomorrow’s work more accurate, visible, and accountable.
            </p>
            <a className="button product-hero-v3__button" href="#product-system">
              Open the product system <ArrowRight size={18} aria-hidden="true" />
            </a>
            <div className="product-hero-v3__signals" aria-label="Invicto product highlights">
              <span><strong>02</strong> connected systems</span>
              <span><strong>01</strong> live platform</span>
              <span><strong>Human</strong> review stays central</span>
            </div>
          </div>
          <a className="product-hero-v3__scroll" href="#product-system" aria-label="Scroll to explore the product system">
            <span>Scroll to open</span><i><b /></i>
          </a>
        </section>

        <section
          ref={revealRef}
          className="product-reveal-v3"
          id="product-system"
          aria-labelledby="product-system-heading"
        >
          <div ref={revealStageRef} className="product-reveal-v3__stage">
            <GridBoxBackground />
            <div className="container product-reveal-v3__inner">
              <div className="product-reveal-v3__head">
                <p className="eyebrow"><span /> The product direction</p>
                <h2 id="product-system-heading">Two systems. One operating view.</h2>
                <p>Scroll once to separate the product layers, then enter either system for the complete workflow.</p>
              </div>

              <div ref={productDeckRef} className="product-reveal-v3__deck">
                <a className="product-reveal-card product-reveal-card--traceq" href="#traceq">
                  <div className="product-reveal-card__top">
                    <span>01 / Operations platform</span>
                    <i><Workflow size={22} aria-hidden="true" /></i>
                  </div>
                  <div className="product-reveal-card__copy">
                    <small>LIVE · IN-HOUSE PLATFORM</small>
                    <h3>TraceQ</h3>
                    <p>One connected operating record for orders, assignments, production, quality, productivity, and invoicing.</p>
                  </div>
                  <ul aria-label="TraceQ focus areas">
                    <li>Order flow</li><li>Workforce</li><li>Billing</li>
                  </ul>
                  <span className="product-reveal-card__link">Explore TraceQ <ArrowRight size={18} aria-hidden="true" /></span>
                </a>

                <a className="product-reveal-card product-reveal-card--quality" href="#ai-quality">
                  <div className="product-reveal-card__top">
                    <span>02 / Quality intelligence</span>
                    <i><Bot size={22} aria-hidden="true" /></i>
                  </div>
                  <div className="product-reveal-card__copy">
                    <small>IN DEVELOPMENT · HUMAN REVIEWED</small>
                    <h3>AI Quality Workflow</h3>
                    <p>A focused agent-assisted layer for checking typed records, surfacing uncertainty, and routing exceptions to trained reviewers.</p>
                  </div>
                  <ul aria-label="AI quality workflow focus areas">
                    <li>Compare</li><li>Surface</li><li>Review</li>
                  </ul>
                  <span className="product-reveal-card__link">Explore the quality layer <ArrowRight size={18} aria-hidden="true" /></span>
                </a>
              </div>

              <div className="product-reveal-v3__progress" aria-hidden="true">
                <span>Closed</span><i><b /></i><span ref={revealProgressRef}>00%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section traceq-v2" id="traceq" aria-labelledby="traceq-heading">
          <div className="container">
            <div className="product-heading-v2">
              <div>
                <p className="eyebrow"><span /> Product 01 · Operations</p>
                <h2 id="traceq-heading">The operational spine from intake to invoice.</h2>
              </div>
              <div>
                <p>TraceQ is Invicto’s in-house application platform for coordinating title-search production—bringing orders, people, progress, quality, and billing into one connected operating view.</p>
                <a href="https://traceqlabs.com/" target="_blank" rel="noreferrer">
                  Visit TraceQ Labs <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="traceq-system-v2">
              <div className="traceq-spine" aria-label="Conceptual TraceQ operating workflow">
                <div className="traceq-spine__bar">
                  <span><b /> TRACEQ / OPERATIONS</span>
                  <small><i /> Connected workflow</small>
                </div>
                <div className="traceq-spine__intro">
                  <div><small>One order</small><strong>One connected operating record</strong></div>
                  <span>INTAKE → DELIVERY</span>
                </div>
                <div className="traceq-spine__track">
                  {workflowStages.map((stage, index) => (
                    <article key={stage}>
                      <span>0{index + 1}</span>
                      <i><b /></i>
                      <strong>{stage}</strong>
                    </article>
                  ))}
                </div>
                <div className="traceq-spine__signals">
                  <article><UsersRound size={18} aria-hidden="true" /><span><small>People</small><strong>Ownership follows the order</strong></span></article>
                  <article><ClipboardCheck size={18} aria-hidden="true" /><span><small>Quality</small><strong>Review stays visible</strong></span></article>
                  <article><ReceiptText size={18} aria-hidden="true" /><span><small>Billing</small><strong>Completed work moves forward</strong></span></article>
                </div>
                <div className="traceq-spine__ticker" aria-hidden="true">
                  <span>ORDER</span><i /> <span>OWNER</span><i /> <span>STATUS</span><i /> <span>QUALITY</span><i /> <span>INVOICE</span>
                </div>
              </div>

              <div className="traceq-ledger">
                <div className="traceq-ledger__head"><span>Platform capabilities</span><small>06 / connected</small></div>
                {traceQCapabilities.map(({ icon: Icon, title, description }, index) => (
                  <article key={title}>
                    <span className="traceq-ledger__number">0{index + 1}</span>
                    <span className="traceq-ledger__icon"><Icon size={18} aria-hidden="true" /></span>
                    <span><strong>{title}</strong><p>{description}</p></span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section ai-lab-v2" id="ai-quality" aria-labelledby="ai-quality-heading">
          <div className="container">
            <div className="product-heading-v2 product-heading-v2--light">
              <div>
                <p className="eyebrow eyebrow--light"><span /> Product 02 · In development</p>
                <h2 id="ai-quality-heading">A quality layer that knows when to ask.</h2>
              </div>
              <div>
                <p>We are developing an agent-assisted workflow for title-search typing and QC—designed to help find avoidable errors, surface uncertainty, and focus trained reviewers on the decisions that need them.</p>
              </div>
            </div>

            <div className="inspection-lab" aria-label="Conceptual AI-assisted quality workflow">
              <article className="inspection-document">
                <div className="inspection-panel__head"><span>01 / Typed record</span><i>Source view</i></div>
                <div className="inspection-document__title"><ScanLine size={20} aria-hidden="true" /><span><small>Title search file</small><strong>Structured typing record</strong></span></div>
                <dl>
                  <div><dt>Owner name</dt><dd>Source matched <CheckCircle2 size={15} /></dd></div>
                  <div><dt>Parcel reference</dt><dd>Format checked <CheckCircle2 size={15} /></dd></div>
                  <div className="needs-review"><dt>Legal description</dt><dd>Review requested <span>!</span></dd></div>
                  <div><dt>Effective date</dt><dd>Rule checked <CheckCircle2 size={15} /></dd></div>
                </dl>
              </article>

              <article className="inspection-agent">
                <div className="inspection-panel__head"><span>02 / Agent layer</span><i>Defined checks</i></div>
                <div className="inspection-agent__core">
                  <span className="inspection-agent__orbit inspection-agent__orbit--one" />
                  <span className="inspection-agent__orbit inspection-agent__orbit--two" />
                  <span className="inspection-agent__bot"><Bot size={29} aria-hidden="true" /></span>
                </div>
                <strong>Examine. Compare. Surface.</strong>
                <p>The agent checks defined fields and workflow rules, then routes uncertainty instead of concealing it.</p>
                <div className="inspection-agent__status"><i /><span>Exception routed to review</span></div>
              </article>

              <article className="inspection-review">
                <div className="inspection-panel__head"><span>03 / Human review</span><i>Accountable release</i></div>
                <div className="inspection-review__signal"><ShieldCheck size={23} aria-hidden="true" /><span><small>Focused exception</small><strong>Legal description mismatch</strong></span></div>
                <div className="inspection-review__compare">
                  <span><small>Typed value</small><b>Version A</b></span>
                  <i>↔</i>
                  <span><small>Source record</small><b>Version B</b></span>
                </div>
                <p>A trained reviewer resolves the exception and remains responsible for the final quality decision.</p>
                <span className="inspection-review__button"><CheckCircle2 size={17} /> Reviewer approval</span>
              </article>
            </div>

            <div className="ai-principles-v2">
              <div><Sparkles size={20} aria-hidden="true" /><span><small>Automation role</small><strong>Strengthen judgment</strong></span></div>
              <div><ScanLine size={20} aria-hidden="true" /><span><small>Agent role</small><strong>Make exceptions visible</strong></span></div>
              <div><ShieldCheck size={20} aria-hidden="true" /><span><small>Reviewer role</small><strong>Own the release decision</strong></span></div>
            </div>

            <p className="ai-disclaimer-v2">This product is currently in development. Final capabilities, controls, and availability will be confirmed after workflow validation.</p>
          </div>
        </section>

        <div className="products-contact-wave">
          <div className="products-contact-wave__surface" aria-hidden="true">
            <DottedSurface size={8} opacity={0.92} sizeAttenuation vertexColors />
          </div>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
