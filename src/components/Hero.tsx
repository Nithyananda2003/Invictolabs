import { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Silk } from './ui/Silk'

const propertyImages = [
  { src: '/home-title-hero.webp', position: '54% center' },
  { src: '/home-title-house-2.webp', position: '50% center' },
  { src: '/home-title-house-3.webp', position: '50% center' },
]

export function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    propertyImages.slice(1).forEach(({ src }) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = src
    })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let rotationTimer = 0

    const stopRotation = () => {
      if (rotationTimer) window.clearInterval(rotationTimer)
      rotationTimer = 0
    }

    const startRotation = () => {
      stopRotation()
      if (document.hidden || reducedMotion.matches) return
      rotationTimer = window.setInterval(() => {
        setActiveImage((current) => (current + 1) % propertyImages.length)
      }, 5800)
    }

    const handleVisibility = () => startRotation()
    reducedMotion.addEventListener('change', startRotation)
    document.addEventListener('visibilitychange', handleVisibility)
    startRotation()

    return () => {
      stopRotation()
      reducedMotion.removeEventListener('change', startRotation)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-silk" aria-hidden="true">
        <Silk
          speed={3.2}
          scale={1.15}
          color="#1748e8"
          noiseIntensity={0.85}
          rotation={0.18}
        />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Title, mortgage &amp; property operations</p>
          <h1 id="hero-heading">
            Clarity for every file. <em>Capacity</em> for every opportunity.
          </h1>
          <p className="hero-lede">
            Invicto brings dependable title research and flexible mortgage operations support into one connected workflow—helping your team move every property file forward with confidence.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Start a conversation
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href="#services">
              Explore our services
              <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className="hero-note">
            <Check size={17} aria-hidden="true" />
            <span>Built around your workflow, service levels, and priorities.</span>
          </div>
        </div>

        <div className="hero-visual">
          <figure className="property-visual">
            <div
              className="property-carousel"
              role="img"
              aria-label="American residential homes representing Invicto's title services"
            >
              {propertyImages.map((image, index) => (
                <img
                  className={index === activeImage ? 'is-active' : ''}
                  src={image.src}
                  alt=""
                  width="1400"
                  height="934"
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  style={{ objectPosition: image.position }}
                  aria-hidden={index !== activeImage}
                  key={image.src}
                />
              ))}
            </div>
          </figure>

        </div>
      </div>

    </section>
  )
}
