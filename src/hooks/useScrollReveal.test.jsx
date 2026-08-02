import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act } from 'react'
import { render, screen } from '@testing-library/react'
import useScrollReveal from './useScrollReveal'
import { installIntersectionObserverMock } from '../test/mockIntersectionObserver'

function Probe() {
  const { ref, visible } = useScrollReveal()
  return (
    <div ref={ref} data-testid="probe">
      {visible ? 'visible' : 'hidden'}
    </div>
  )
}

describe('useScrollReveal', () => {
  let instances

  beforeEach(() => {
    instances = installIntersectionObserverMock()
  })

  it("parte hidden e diventa visible dopo l'intersezione", () => {
    render(<Probe />)
    expect(screen.getByTestId('probe')).toHaveTextContent('hidden')

    act(() => instances[0].trigger(true))

    expect(screen.getByTestId('probe')).toHaveTextContent('visible')
  })

  it('disconnette l\'observer dopo il primo trigger', () => {
    render(<Probe />)

    act(() => instances[0].trigger(true))

    expect(instances[0].observedNodes.size).toBe(0)
  })

  it('è subito visible se prefers-reduced-motion è attivo', () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })

    render(<Probe />)

    expect(screen.getByTestId('probe')).toHaveTextContent('visible')
    expect(instances).toHaveLength(0)

    window.matchMedia = originalMatchMedia
  })
})
