import Button from '../Button'
import useLanguage from '../../i18n/useLanguage'

export default function PreventivoSuccess({ nome, onReset }) {
  const { t } = useLanguage()
  const title = t('preventivo.success.title', { nome: nome || t('preventivo.success.titleFallbackName') })

  return (
    <div className="mt-8 rounded-lg border border-ember-500/40 bg-iron-600 p-8 text-center">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-cream-200">{t('preventivo.success.body')}</p>
      <p className="mt-1 text-xs text-cream-400">{t('preventivo.success.note')}</p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        {t('preventivo.success.resetButton')}
      </Button>
    </div>
  )
}
