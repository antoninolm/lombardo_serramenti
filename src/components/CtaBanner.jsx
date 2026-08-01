import Button from './Button'

export default function CtaBanner({
  title,
  description,
  primary = { to: '/preventivo', label: 'Richiedi Preventivo' },
  secondary,
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-xl border border-ember-500/40 bg-iron-600 px-6 py-12 text-center sm:px-12">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        {description && <p className="mx-auto mt-3 max-w-xl text-cream-200">{description}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button to={primary.to}>{primary.label}</Button>
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
