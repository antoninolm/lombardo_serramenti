import useLanguage from '../i18n/useLanguage'

export default function StatsBand() {
  const { t } = useLanguage()
  const stats = t('home.stats')

  return (
    <div className="border-y border-iron-500 bg-iron-800">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 text-center sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-bold text-ember-500 sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-cream-200">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
