type LogoProps = {
  inverse?: boolean
}

export function Logo({ inverse = false }: LogoProps) {
  return (
    <a className={`logo${inverse ? ' logo--inverse' : ''}`} href="/#top" aria-label="Invicto homepage">
      <img src="/invicto-logo.webp" alt="Invicto" width="640" height="238" decoding="async" />
    </a>
  )
}
