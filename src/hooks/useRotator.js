import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export default function useRotator(items, { intervalMs = 6000 } = {}) {
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(REDUCED_MOTION_QUERY).matches
      : false,
  )
  const [index, setIndex] = useState(0)
  const [entered, setEntered] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion || !Array.isArray(items) || items.length <= 1) return undefined

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
      setEntered(false)
    }, intervalMs)

    return () => clearInterval(id)
  }, [items, intervalMs, prefersReducedMotion])

  useEffect(() => {
    if (entered) return undefined
    const id = setTimeout(() => setEntered(true), 20)
    return () => clearTimeout(id)
  }, [entered])

  return { index, entered }
}
