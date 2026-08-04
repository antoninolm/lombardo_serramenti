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

  it('mostra la sezione "Dicono di noi" con link a Google in italiano', () => {
    renderHome()
    expect(screen.getByText('Dicono di noi')).toBeInTheDocument()
    const link = screen.getByRole('link', {
      name: 'Leggi le recensioni di Lombardo Serramenti su Google (si apre in una nuova scheda)',
    })
    expect(link).toHaveTextContent('Leggi le recensioni su Google →')
    expect(link).toHaveAttribute('href', expect.stringContaining('google.com/maps/place/Lombardo+Serramenti'))
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('mostra la sezione "Dicono di noi" in siciliano dopo il toggle', () => {
    renderHome()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByText('Chi dicinu di nuàutri')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: 'Talìa i recensioni di Lombardo Serramenti supra Google (si rapri nna na nova scheda)',
      }),
    ).toBeInTheDocument()
  })

  describe('sezione "Le nostre lavorazioni" per materiale', () => {
    it('mostra le card Ferro/Acciaio/Alluminio con link a /prodotti in italiano, senza "artigian…" per Acciaio/Alluminio', () => {
      renderHome()
      const ferroCard = screen.getByRole('heading', { name: 'Ferro', level: 3 }).closest('a')
      const acciaioCard = screen.getByRole('heading', { name: 'Acciaio', level: 3 }).closest('a')
      const alluminioCard = screen.getByRole('heading', { name: 'Alluminio', level: 3 }).closest('a')

      expect(ferroCard).toHaveAttribute('href', '/prodotti')
      expect(acciaioCard).toHaveAttribute('href', '/prodotti')
      expect(alluminioCard).toHaveAttribute('href', '/prodotti')

      expect(ferroCard).toHaveTextContent(/lavorati a mano/i)
      expect(acciaioCard).not.toHaveTextContent(/artigian/i)
      expect(alluminioCard).not.toHaveTextContent(/artigian/i)
    })

    it('mostra le card Ferru/Acciaru/Alluminiu con link a /prodotti in siciliano, senza "artigian…" per Acciaru/Alluminiu', () => {
      renderHome()
      fireEvent.click(screen.getByRole('button', { name: 'SIC' }))

      const ferroCard = screen.getByRole('heading', { name: 'Ferru', level: 3 }).closest('a')
      const acciaioCard = screen.getByRole('heading', { name: 'Acciaru', level: 3 }).closest('a')
      const alluminioCard = screen.getByRole('heading', { name: 'Alluminiu', level: 3 }).closest('a')

      expect(ferroCard).toHaveAttribute('href', '/prodotti')
      expect(acciaioCard).toHaveAttribute('href', '/prodotti')
      expect(alluminioCard).toHaveAttribute('href', '/prodotti')

      expect(acciaioCard).not.toHaveTextContent(/artigian/i)
      expect(alluminioCard).not.toHaveTextContent(/artigian/i)
    })
  })
})
