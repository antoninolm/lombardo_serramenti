import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageContext'
import PreventivoForm from './PreventivoForm'

function renderForm(onSubmitted = vi.fn()) {
  return render(
    <LanguageProvider>
      <PreventivoForm onSubmitted={onSubmitted} />
    </LanguageProvider>,
  )
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText('Nome e Cognome'), { target: { value: 'Test Fase 3b' } })
  fireEvent.change(screen.getByLabelText('Telefono'), { target: { value: '+39 333 1234567' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
  fireEvent.change(screen.getByLabelText('Tipo di lavoro'), { target: { value: 'cancelli' } })
  fireEvent.click(screen.getByLabelText(/trattamento dei dati personali/))
}

describe('PreventivoForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('elenca le categorie prodotto tradotte come opzioni del tipo di lavoro', () => {
    renderForm()
    const select = screen.getByLabelText('Tipo di lavoro')
    expect(within(select).getByRole('option', { name: 'Cancelli' })).toBeInTheDocument()
    expect(within(select).getByRole('option', { name: 'Altro' })).toBeInTheDocument()
  })

  it('invia i dati al backend e chiama onSubmitted quando il fetch ha successo', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const onSubmitted = vi.fn()
    renderForm(onSubmitted)

    fillValidForm()
    fireEvent.click(screen.getByRole('button', { name: 'Invia Richiesta' }))

    await waitFor(() => expect(onSubmitted).toHaveBeenCalledWith('Test Fase 3b'))
  })

  it('mostra un errore e mantiene i valori quando il fetch fallisce', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    renderForm()

    fillValidForm()
    fireEvent.click(screen.getByRole('button', { name: 'Invia Richiesta' }))

    expect(
      await screen.findByText('Invio non riuscito. Controlla la connessione e riprova, oppure chiamaci direttamente.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nome e Cognome')).toHaveValue('Test Fase 3b')
  })

  it('invia il payload atteso, incluso il campo honeypot vuoto', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    renderForm()

    fillValidForm()
    fireEvent.click(screen.getByRole('button', { name: 'Invia Richiesta' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/preventivo')
    expect(options.method).toBe('POST')
    const payload = JSON.parse(options.body)
    expect(payload).toMatchObject({
      nome: 'Test Fase 3b',
      telefono: '+39 333 1234567',
      email: 'test@example.com',
      tipoLavoro: 'cancelli',
      privacy: true,
      azienda: '',
    })
  })
})
