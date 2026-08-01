export default function FeatureCard({ title, description }) {
  return (
    <div className="rounded-lg border border-iron-500 bg-iron-600 p-6">
      <div className="mb-4 h-10 w-10 rounded bg-ember-500" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-cream-200">{description}</p>
    </div>
  )
}
