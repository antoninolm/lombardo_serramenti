import Placeholder from './Placeholder'
import { galleriaFilters } from '../data/galleria'

const labelByCategory = Object.fromEntries(galleriaFilters.map((f) => [f.value, f.label]))

export default function GalleryGrid({ items }) {
  if (items.length === 0) {
    return <p className="text-cream-200">Nessuna immagine per questa categoria.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="relative overflow-hidden rounded-lg border border-iron-500">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ember-500 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-ember-ink">
            {labelByCategory[item.category]}
          </span>
          <Placeholder alt={item.caption} caption={item.caption} ratio="4 / 3" />
        </div>
      ))}
    </div>
  )
}
