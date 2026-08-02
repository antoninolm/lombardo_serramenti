import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import Preventivo from './Preventivo'

function renderPreventivo() {
  return render(
    <LanguageProvider>
      <LanguageToggle />
      <Preventivo />
    </LanguageProvider>,
  )
}

describe('Preventivo', () => {
  it('mostra gli errori di validazione in italiano su invio vuoto', () => {
    renderPreventivo()
    fireEvent.click(screen.getByRole('button', { name: 'Invia Richiesta' }))
    expect(screen.getByText('Inserisci il tuo nome e cognome.')).toBeInTheDocument()
  })

  it('mostra il form in siciliano dopo il toggle, incluso l’errore di validazione', () => {
    renderPreventivo()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    fireEvent.click(screen.getByRole('button', { name: 'Manna Richiesta' }))
    expect(screen.getByText('Metti u to nomu e cugnomu.')).toBeInTheDocument()
  })
})
