export default function InfoCard({ title, lines }) {
  return (
    <div className="rounded-lg border border-cream-300 bg-white p-5">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-ember-500">{title}</p>
      <div className="mt-2 space-y-1 break-words text-ink-500">
        {lines.map((line) =>
          typeof line === 'string' ? (
            <p key={line}>{line}</p>
          ) : (
            <p key={line.href}>
              <a href={line.href} className="text-ember-500 hover:underline">
                {line.text}
              </a>
            </p>
          ),
        )}
      </div>
    </div>
  )
}
