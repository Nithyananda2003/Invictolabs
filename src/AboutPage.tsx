import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, Building2, Check } from 'lucide-react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { SectionHeading } from './components/SectionHeading'
import { DotGrid } from './components/ui/DotGrid'
import { DottedSurface } from './components/ui/DottedSurface'
import { companyStats, leaders, principles } from './data/site'

export default function AboutPage() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.about-reveal'))
    sections.forEach((section) => section.classList.add('about-reveal--ready'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main className="about-page" id="main-content">
        <section className="about-hero" id="top" aria-labelledby="about-heading">
          <div className="about-hero__dots" aria-hidden="true">
            <DotGrid
              dotSize={2.4}
              gap={29}
              baseColor="#39549e"
              activeColor="#86a0ff"
              proximity={135}
              speedTrigger={125}
              shockRadius={205}
              shockStrength={1.8}
              resistance={900}
              returnDuration={1.25}
            />
          </div>

          <div className="container about-hero__grid">
            <div className="about-hero__copy">
              <p className="eyebrow eyebrow--light"><span /> The company behind the capacity</p>
              <h1 id="about-heading">Built close to the work. Designed for what comes next.</h1>
              <p>
                Invicto connects disciplined people, clear processes, and practical technology to help U.S. mortgage and title teams grow without losing operational control.
              </p>
              <div className="about-hero__actions">
                <a className="button button--light" href="#leadership">
                  Our story &amp; leaders
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="about-hero__link" href="/faq#top">
                  Client FAQ <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="about-hero__trust">
                <span><i /> Dallas headquarters</span>
                <span><i /> Bengaluru delivery center</span>
              </div>
            </div>

            <div className="about-hero__metrics" aria-label="Invicto company milestones">
              {companyStats.map((stat, index) => (
                <article key={stat.label}>
                  <span>0{index + 1}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section story-leadership about-reveal" id="leadership" aria-labelledby="story-leadership-heading">
          <div className="story-leadership__surface" aria-hidden="true">
            <DottedSurface size={7.5} opacity={0.72} sizeAttenuation vertexColors />
          </div>
          <div className="container">
            <div className="story-leadership__head">
              <SectionHeading
                id="story-leadership-heading"
                eyebrow="Our story & leadership"
                title="A company built around shared success."
                description="Invicto began with one belief: operational support should create confidence, not distance. Our founders continue to lead with that same standard."
              />
              <p><Building2 size={17} /> Founded in 2021 · Privately held</p>
            </div>

            <div className="story-leadership__grid">
              <article className="story-panel">
                <div className="story-panel__topline"><span>Our story</span><span>Dallas → Bengaluru</span></div>
                <h3>The partner we wanted to work with.</h3>
                <p>
                  From title production and mortgage operations to tax, MLS, and technology services, Invicto is designed around the pressures clients face: changing volumes, demanding timelines, and an uncompromising need for accuracy.
                </p>
                <p>
                  We continue to grow one trusted relationship, one well-delivered order, and one shared success at a time.
                </p>
                <blockquote>
                  “Trust grows when every promise is matched by dependable delivery.”
                  <cite>How we build long-term partnerships</cite>
                </blockquote>
              </article>

              {leaders.map((leader, index) => (
                <article className="leader-card leader-card--compact" key={leader.name}>
                  <a
                    className="leader-card__image"
                    href={leader.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${leader.name} on LinkedIn`}
                  >
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.role}`}
                      width="900"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>0{index + 1}</span>
                    <i><ArrowUpRight size={18} aria-hidden="true" /></i>
                  </a>
                  <div className="leader-card__content">
                    <p>{leader.role}</p>
                    <h3>{leader.name}</h3>
                    <p>{leader.bio}</p>
                    <a href={leader.linkedIn} target="_blank" rel="noreferrer">
                      LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section principles about-reveal" aria-labelledby="principles-heading">
          <div className="container principles__grid">
            <div className="principles__intro">
              <p className="eyebrow eyebrow--light"><span /> What guides us</p>
              <h2 id="principles-heading">The standards behind every order.</h2>
              <p>Simple principles keep our decisions clear, our delivery accountable, and every client relationship moving in the same direction.</p>
            </div>
            <div className="principles__list">
              {principles.map((principle, index) => (
                <article key={principle.title}>
                  <span><Check size={17} aria-hidden="true" /></span>
                  <p>0{index + 1}</p>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
