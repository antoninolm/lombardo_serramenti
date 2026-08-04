import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import Home from './Home'

function renderHome() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <LanguageToggle />
        <Home />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('Home', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renderizza il claim hero in italiano di default', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Il ferro è il nostro mestiere.')
  })

  it('renderizza il claim hero in siciliano dopo il toggle', () => {
    renderHome()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('U ferru è u nostru misteri.')
  })

  describe('rotazione quotes hero', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('mostra la prima citazione di default e la seconda dopo 6 secondi', () => {
      renderHome()
      expect(
        screen.getByText(
          'Cancelli, ringhiere, portoni e opere su misura, disegnati e realizzati a mano nella nostra officina. Da due generazioni.',
        ),
      ).toBeInTheDocument()

      act(() => vi.advanceTimersByTime(6000))

      expect(screen.getByText('Il ferro non si comanda: si accompagna.')).toBeInTheDocument()
    })

    it('riparte dalla prima citazione della nuova lingua dopo il toggle', () => {
      renderHome()
      act(() => vi.advanceTimersByTime(6000))
      expect(screen.getByText('Il ferro non si comanda: si accompagna.')).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'SIC' }))

      expect(
        screen.getByText(
          'Cancelli, ringheri, purtuna e travagghi supra misura, disignati e fatti a manu nna nostra putìa. Di dui generazioni.',
        ),
      ).toBeInTheDocument()
    })
  })
})
