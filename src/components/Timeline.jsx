import useLanguage from '../i18n/useLanguage'

export default function Timeline() {
  const { t } = useLanguage()
  const milestones = t('chiSiamo.timeline')

  return (
    <div className="divide-y divide-cream-300 border-t border-cream-300">
      {milestones.map((milestone) => (
        <div key={milestone.year} className="grid gap-2 py-6 sm:grid-cols-[100px_1fr] sm:gap-6">
          <p className="font-display text-lg font-bold text-ember-500">{milestone.year}</p>
          <div>
            <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
            <p className="mt-1 text-ink-500">{milestone.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
