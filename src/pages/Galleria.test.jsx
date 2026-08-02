import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Galleria from './Galleria'
import { installIntersectionObserverMock } from '../test/mockIntersectionObserver'

describe('Galleria', () => {
  beforeEach(() => {
    installIntersectionObserverMock()
  })

  it('mostra tutte e 14 le foto della galleria', () => {
    render(<Galleria />)
    expect(screen.getAllByRole('img')).toHaveLength(14)
  })
})
