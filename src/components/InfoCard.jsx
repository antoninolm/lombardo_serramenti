export default function InfoCard({ title, lines }) {
  return (
    <div className="rounded-lg border border-cream-300 bg-white p-5">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-ember-500">{title}</p>
      <div className="mt-2 space-y-1 text-ink-500">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}
