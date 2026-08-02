const DESTINATARIO = 'lombardoserramenti.contatti@gmail.com'
const MITTENTE = 'onboarding@resend.dev'

// mirror di src/components/forms/PreventivoForm.jsx
const telefonoRegex = /^[+\d][\d\s()-]{6,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(body) {
  const errors = []
  if (!body.nome || !String(body.nome).trim()) errors.push('Nome mancante.')
  if (!telefonoRegex.test(String(body.telefono ?? '').trim())) errors.push('Telefono non valido.')
  if (!emailRegex.test(String(body.email ?? '').trim())) errors.push('Email non valida.')
  if (!body.tipoLavoro) errors.push('Tipo di lavoro mancante.')
  if (body.privacy !== true) errors.push('Consenso privacy mancante.')
  return errors
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' })
    return
  }

  try {
    const body = req.body ?? {}

    if (typeof body.azienda === 'string' && body.azienda.trim() !== '') {
      res.status(200).json({ ok: true })
      return
    }

    const errors = validate(body)
    if (errors.length > 0) {
      res.status(400).json({ errors })
      return
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configurata')
      res.status(500).json({ error: 'Errore interno del server.' })
      return
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: MITTENTE,
        to: DESTINATARIO,
        reply_to: body.email,
        subject: `Richiesta preventivo — ${body.nome} (${body.tipoLavoro})`,
        text: `Nome: ${body.nome}\nTelefono: ${body.telefono}\nEmail: ${body.email}\nTipo di lavoro: ${body.tipoLavoro}\nDescrizione: ${body.descrizione || '(nessuna descrizione)'}\n`,
      }),
    })

    if (!resendResponse.ok) {
      console.error('Resend error', resendResponse.status, await resendResponse.text())
      res.status(502).json({ error: 'Invio email non riuscito, riprova più tardi.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Errore invio preventivo', err)
    res.status(500).json({ error: 'Errore interno del server.' })
  }
}
