export default function SectionHeading({ eyebrow, title, description, action, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="font-display text-sm font-semibold uppercase tracking-widest text-ember-500">
          {eyebrow}
        </span>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        {action}
      </div>
      {description && <p className="max-w-2xl text-ink-500">{description}</p>}
    </div>
  )
}
