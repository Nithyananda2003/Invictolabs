import { SiteLink } from './SiteLink'
type LogoProps = {
  inverse?: boolean
}

export function Logo({ inverse = false }: LogoProps) {
  return (
    <SiteLink className={`logo${inverse ? ' logo--inverse' : ''}`} href="/" aria-label="Invicto homepage">
      <img src="/invicto-logo-360.webp" srcSet="/invicto-logo-180.webp 180w, /invicto-logo-360.webp 360w" sizes="146px" alt="Invicto" width="360" height="134" decoding="async" fetchPriority={inverse ? 'auto' : 'high'} />
    </SiteLink>
  )
}
