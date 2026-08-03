import Button from './Button'
import useLanguage from '../i18n/useLanguage'

export default function CtaBanner({ title, description, primary, secondary }) {
  const { t } = useLanguage()
  const resolvedPrimary = primary ?? { to: '/preventivo', label: t('common.richiediPreventivo') }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-xl border-l-[3px] border-ember-500 bg-cream-200 px-6 py-12 text-center sm:px-12">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        {description && <p className="mx-auto mt-3 max-w-xl text-ink-500">{description}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button to={resolvedPrimary.to} variant="dark">{resolvedPrimary.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="outline">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
