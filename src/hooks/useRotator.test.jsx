import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act } from 'react'
import { render, screen } from '@testing-library/react'
import useRotator from './useRotator'

function Probe({ items }) {
  const { index, entered } = useRotator(items)
  return (
    <div data-testid="probe" data-entered={entered}>
      {items[index]}
    </div>
  )
}

describe('useRotator', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('avanza ciclicamente ogni 6 secondi', () => {
    const items = ['uno', 'due', 'tre']
    render(<Probe items={items} />)
    expect(screen.getByTestId('probe')).toHaveTextContent('uno')

    act(() => vi.advanceTimersByTime(6000))
    expect(screen.getByTestId('probe')).toHaveTextContent('due')

    act(() => vi.advanceTimersByTime(6000))
    expect(screen.getByTestId('probe')).toHaveTextContent('tre')

    act(() => vi.advanceTimersByTime(6000))
    expect(screen.getByTestId('probe')).toHaveTextContent('uno')
  })

  it('non avanza con prefers-reduced-motion attivo', () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })

    const items = ['uno', 'due', 'tre']
    render(<Probe items={items} />)

    act(() => vi.advanceTimersByTime(60000))
    expect(screen.getByTestId('probe')).toHaveTextContent('uno')

    window.matchMedia = originalMatchMedia
  })
})
