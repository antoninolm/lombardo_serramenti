import useLanguage from './useLanguage'

const langButtonClasses = (active) =>
  `font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
    active ? 'text-ember-500' : 'text-cream-200 hover:text-cream-50'
  }`

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t('nav.lingua')} className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        aria-pressed={lang === 'it'}
        className={langButtonClasses(lang === 'it')}
        onClick={() => setLang('it')}
      >
        ITA
      </button>
      <span className="text-cream-400" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        aria-pressed={lang === 'scn'}
        className={langButtonClasses(lang === 'scn')}
        onClick={() => setLang('scn')}
      >
        SIC
      </button>
    </div>
  )
}
