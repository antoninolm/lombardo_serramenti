import { useState } from 'react'
import FormField from './FormField'
import Button from '../Button'
import { prodotti } from '../../data/prodotti'
import useLanguage from '../../i18n/useLanguage'

const initialForm = {
  nome: '',
  telefono: '',
  email: '',
  tipoLavoro: '',
  descrizione: '',
  privacy: false,
}

const telefonoRegex = /^[+\d][\d\s()-]{6,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form, t) {
  const errors = {}
  if (!form.nome.trim()) errors.nome = t('preventivo.form.errors.nome')
  if (!telefonoRegex.test(form.telefono.trim())) errors.telefono = t('preventivo.form.errors.telefono')
  if (!emailRegex.test(form.email.trim())) errors.email = t('preventivo.form.errors.email')
  if (!form.tipoLavoro) errors.tipoLavoro = t('preventivo.form.errors.tipoLavoro')
  if (!form.privacy) errors.privacy = t('preventivo.form.errors.privacy')
  return errors
}

export default function PreventivoForm({ onSubmitted }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const tipiLavoro = [
    ...prodotti.map((p) => ({ value: p.slug, label: t(`prodotti.${p.slug}.title`) })),
    { value: 'altro', label: t('preventivo.form.altro') },
  ]

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(form, t)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    // Fase 2: invio simulato, nessuna chiamata di rete.
    // L'invio reale (Resend via Vercel serverless function) è previsto in Fase 3.
    setTimeout(() => {
      setSubmitting(false)
      onSubmitted(form.nome)
    }, 600)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
      <FormField label={t('preventivo.form.nome')} error={errors.nome}>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="rounded border border-iron-400 bg-iron-600 px-3 py-2 text-cream-50 focus:border-ember-500 focus:outline-none"
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label={t('preventivo.form.telefono')} error={errors.telefono}>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="rounded border border-iron-400 bg-iron-600 px-3 py-2 text-cream-50 focus:border-ember-500 focus:outline-none"
          />
        </FormField>

        <FormField label={t('preventivo.form.email')} error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="rounded border border-iron-400 bg-iron-600 px-3 py-2 text-cream-50 focus:border-ember-500 focus:outline-none"
          />
        </FormField>
      </div>

      <FormField label={t('preventivo.form.tipoLavoro')} error={errors.tipoLavoro}>
        <select
          name="tipoLavoro"
          value={form.tipoLavoro}
          onChange={handleChange}
          className="rounded border border-iron-400 bg-iron-600 px-3 py-2 text-cream-50 focus:border-ember-500 focus:outline-none"
        >
          <option value="">{t('preventivo.form.tipoLavoroPlaceholder')}</option>
          {tipiLavoro.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label={t('preventivo.form.descrizione')}>
        <textarea
          name="descrizione"
          value={form.descrizione}
          onChange={handleChange}
          rows={4}
          className="rounded border border-iron-400 bg-iron-600 px-3 py-2 text-cream-50 focus:border-ember-500 focus:outline-none"
        />
      </FormField>

      <label className="flex items-start gap-2 text-sm text-cream-200">
        <input
          type="checkbox"
          name="privacy"
          checked={form.privacy}
          onChange={handleChange}
          className="mt-1"
        />
        <span>{t('preventivo.form.privacy')}</span>
      </label>
      {errors.privacy && (
        <p className="-mt-4 text-xs text-red-400" role="alert">
          {errors.privacy}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="self-start disabled:opacity-60">
        {submitting ? t('preventivo.form.submitting') : t('preventivo.form.submit')}
      </Button>
    </form>
  )
}
