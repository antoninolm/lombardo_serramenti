import { galleriaFilters } from '../data/galleria'

export default function GalleryFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {galleriaFilters.map((filtro) => {
        const active = filtro.value === value
        return (
          <button
            key={filtro.value}
            type="button"
            onClick={() => onChange(filtro.value)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-1.5 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
              active
                ? 'border-ember-500 bg-ember-500 text-ember-ink'
                : 'border-iron-400 text-cream-200 hover:border-ember-500 hover:text-cream-50'
            }`}
          >
            {filtro.label}
          </button>
        )
      })}
    </div>
  )
}
