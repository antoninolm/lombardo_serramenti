import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from './LanguageContext'
import useLanguage from './useLanguage'

function Probe() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="nav-home">{t('nav.home')}</span>
      <span data-testid="footer-taglia">{t('footer.tagline')}</span>
      <span data-testid="missing">{t('non.esiste')}</span>
      <button type="button" onClick={() => setLang('scn')}>
        scn
      </button>
    </div>
  )
}

describe('LanguageProvider / useLanguage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('parte in italiano di default', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('it')
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home')
  })

  it('t() risolve dal dizionario attivo dopo il cambio lingua', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'scn' }))
    expect(screen.getByTestId('lang')).toHaveTextContent('scn')
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Casa')
  })

  it('t() non torna mai una stringa vuota per una chiave assente', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('missing')).toHaveTextContent('non.esiste')
  })

  it('funziona anche senza LanguageProvider esplicito, grazie al default del context', () => {
    render(<Probe />)
    expect(screen.getByTestId('lang')).toHaveTextContent('it')
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home')
  })

  it('la scelta della lingua persiste in localStorage', () => {
    const { unmount } = render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'scn' }))
    expect(window.localStorage.getItem('lombardo-lang')).toBe('scn')
    unmount()

    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('scn')
  })

  it('fa fallback in-memory se localStorage non è disponibile', () => {
    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage non disponibile')
    })
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('localStorage non disponibile')
    })

    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('it')

    fireEvent.click(screen.getByRole('button', { name: 'scn' }))
    expect(screen.getByTestId('lang')).toHaveTextContent('scn')

    getSpy.mockRestore()
    setSpy.mockRestore()
  })
})
