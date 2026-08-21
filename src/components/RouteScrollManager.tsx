import { useEffect, type ReactNode } from 'react'

const FALLBACK_HEADER_OFFSET = 82

function getHashId(hash = window.location.hash) {
  if (!hash || hash === '#') return ''

  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return hash.slice(1)
  }
}

function scrollToRouteTarget(hash: string, behavior: ScrollBehavior) {
  const id = getHashId(hash)

  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior })
    return true
  }

  const target = document.getElementById(id)
  if (!target) return false

  const headerOffset = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? FALLBACK_HEADER_OFFSET
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: Math.max(0, targetTop), behavior })
  return true
}

function scrollAfterRender(hash: string, behavior: ScrollBehavior) {
  let attempts = 0
  let frame = 0

  const findAndScroll = () => {
    attempts += 1
    if (scrollToRouteTarget(hash, behavior) || attempts >= 16) return
    frame = window.requestAnimationFrame(findAndScroll)
  }

  frame = window.requestAnimationFrame(() => {
    frame = window.requestAnimationFrame(findAndScroll)
  })

  return () => window.cancelAnimationFrame(frame)
}

type RouteScrollManagerProps = {
  behavior: ScrollBehavior
  children: ReactNode
  locationKey: string
}

export function RouteScrollManager({ behavior, children, locationKey }: RouteScrollManagerProps) {
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useEffect(() => scrollAfterRender(window.location.hash, behavior), [behavior, locationKey])

  return children
}
