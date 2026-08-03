import { Link } from 'react-router-dom'
import Placeholder from './Placeholder'

export default function CategoryCard({ slug, title, image, imageAlt }) {
  return (
    <Link
      to={`/prodotti#${slug}`}
      className="group overflow-hidden rounded-lg border border-cream-300 bg-white transition-colors hover:border-ember-500"
    >
      {image ? (
        <img src={image} alt={imageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <Placeholder alt={imageAlt} ratio="4 / 3" />
      )}
      <div className="p-4">
        <h3 className="font-display text-base font-semibold group-hover:text-ember-500">{title}</h3>
      </div>
    </Link>
  )
}
