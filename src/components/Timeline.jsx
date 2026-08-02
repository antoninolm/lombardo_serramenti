import useLanguage from '../i18n/useLanguage'

export default function Timeline() {
  const { t } = useLanguage()
  const milestones = t('chiSiamo.timeline')

  return (
    <div className="divide-y divide-iron-500 border-t border-iron-500">
      {milestones.map((milestone) => (
        <div key={milestone.year} className="grid gap-2 py-6 sm:grid-cols-[100px_1fr] sm:gap-6">
          <p className="font-display text-lg font-bold text-ember-500">{milestone.year}</p>
          <div>
            <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
            <p className="mt-1 text-cream-200">{milestone.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
