import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('mostra la conferma dopo un invio con fetch simulato con successo', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    renderPreventivo()

    fireEvent.change(screen.getByLabelText('Nome e Cognome'), { target: { value: 'Test Fase 3b' } })
    fireEvent.change(screen.getByLabelText('Telefono'), { target: { value: '+39 333 1234567' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Tipo di lavoro'), { target: { value: 'cancelli' } })
    fireEvent.click(screen.getByLabelText(/trattamento dei dati personali/))
    fireEvent.click(screen.getByRole('button', { name: 'Invia Richiesta' }))

    await waitFor(() => expect(screen.getByText('Richiesta inviata, Test Fase 3b!')).toBeInTheDocument())
  })

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
