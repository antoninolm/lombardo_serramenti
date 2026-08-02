import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import handler from './preventivo.js'

function mockRes() {
  const res = {
    statusCode: null,
    body: null,
  }
  res.status = vi.fn((code) => {
    res.statusCode = code
    return res
  })
  res.json = vi.fn((payload) => {
    res.body = payload
    return res
  })
  return res
}

const validBody = {
  nome: 'Test Fase 3b',
  telefono: '+39 333 1234567',
  email: 'cliente@example.com',
  tipoLavoro: 'cancelli',
  descrizione: 'Una descrizione qualsiasi.',
  privacy: true,
  azienda: '',
}

describe('api/preventivo', () => {
  const originalKey = process.env.RESEND_API_KEY

  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key-non-reale'
  })

  afterEach(() => {
    process.env.RESEND_API_KEY = originalKey
    vi.unstubAllGlobals()
  })

  it('risponde 405 su metodo non POST', async () => {
    const res = mockRes()
    await handler({ method: 'GET', body: {} }, res)
    expect(res.status).toHaveBeenCalledWith(405)
  })

  it.each([
    ['nome mancante', { ...validBody, nome: '' }],
    ['telefono non valido', { ...validBody, telefono: 'abc' }],
    ['email non valida', { ...validBody, email: 'non-una-email' }],
    ['tipoLavoro mancante', { ...validBody, tipoLavoro: '' }],
    ['privacy non true', { ...validBody, privacy: false }],
  ])('risponde 400 con %s', async (_case, body) => {
    const res = mockRes()
    await handler({ method: 'POST', body }, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.body.errors.length).toBeGreaterThan(0)
  })

  it('con honeypot compilato risponde 200 finto e non chiama Resend', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const res = mockRes()
    await handler({ method: 'POST', body: { ...validBody, azienda: 'Bot Srl' } }, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.body).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('risponde 500 se RESEND_API_KEY non è configurata', async () => {
    delete process.env.RESEND_API_KEY
    const res = mockRes()
    await handler({ method: 'POST', body: validBody }, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('risponde 502 senza esporre dettagli se Resend risponde errore', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        text: async () => 'dettaglio interno riservato',
      }),
    )

    const res = mockRes()
    await handler({ method: 'POST', body: validBody }, res)

    expect(res.status).toHaveBeenCalledWith(502)
    expect(JSON.stringify(res.body)).not.toContain('dettaglio interno riservato')
  })

  it('invia a Resend e risponde 200 su successo', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    vi.stubGlobal('fetch', fetchMock)

    const res = mockRes()
    await handler({ method: 'POST', body: validBody }, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.body).toEqual({ ok: true })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer test-key-non-reale' }),
      }),
    )
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(sentBody).toMatchObject({
      from: 'onboarding@resend.dev',
      to: 'lombardoserramenti.contatti@gmail.com',
      reply_to: validBody.email,
    })
    expect(sentBody.subject).toContain(validBody.nome)
  })
})
