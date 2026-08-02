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
  azienda: '',
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
  const [submitError, setSubmitError] = useState(false)

  const tipiLavoro = [
    ...prodotti.map((p) => ({ value: p.slug, label: t(`prodotti.${p.slug}.title`) })),
    { value: 'altro', label: t('preventivo.form.altro') },
  ]

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(form, t)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitError(false)
    setSubmitting(true)
    try {
      const response = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('preventivo submit failed')
      setSubmitting(false)
      onSubmitted(form.nome)
    } catch {
      setSubmitting(false)
      setSubmitError(true)
    }
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

      <input
        type="text"
        name="azienda"
        value={form.azienda}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />

      {submitError && (
        <p className="text-sm text-red-400" role="alert">
          {t('preventivo.form.submitError')}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="self-start disabled:opacity-60">
        {submitting ? t('preventivo.form.submitting') : t('preventivo.form.submit')}
      </Button>
    </form>
  )
}
