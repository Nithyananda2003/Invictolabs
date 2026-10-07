import { SiteLink } from './SiteLink'
import { TaxCertificateHero } from './TaxCertificateHero'
export function ProductHeroVisual({ product }: { product: 'traceq' | 'titleflow-ai' | 'tax-flow' }) {
  if (product === 'tax-flow') return <TaxCertificateHero />

  const traceq = product === 'traceq'
  return <figure className={`product-window ${traceq ? 'product-window--traceq' : 'product-window--title'}`}>
    <div className="product-window__bar"><span><i /><i /><i /></span><small>{traceq ? 'TRACEQ LABS / CLIENT DASHBOARD' : 'TITLEFLOW AI / WORKSPACE WALKTHROUGH'}</small></div>
    <img src={traceq ? '/images/traceq-application-1600.webp' : '/images/titleflow/01-examination-workspace.webp'} srcSet={traceq ? '/images/traceq-application-640.webp 640w, /images/traceq-application-960.webp 960w, /images/traceq-application-1600.webp 1600w' : undefined} sizes={traceq ? '(max-width: 760px) calc(100vw - 32px), (max-width: 1100px) 90vw, 55vw' : undefined} alt={traceq ? 'TraceQ application screenshot showing order status categories, service breakdowns, and recent orders' : 'TitleFlow AI examination workspace with fictional order details beside a source document'} width={traceq ? 1911 : 1920} height={traceq ? 946 : 1080} decoding="async" fetchPriority="high" />
    <figcaption><span>{traceq ? 'Application screenshot · figures shown are not performance claims.' : 'Actual interface · fictional sample order. Source and editable fields appear side by side.'}</span><SiteLink href={traceq ? '#traceq-client-view' : '#ai-quality'}>{traceq ? 'Explore order visibility' : 'Explore the workflow'} ↗</SiteLink></figcaption>
  </figure>
}
