import Placeholder from './Placeholder'
import Button from './Button'

export default function ZigZagBlock({ slug, title, description, imageAlt, reverse = false }) {
  return (
    <div
      id={slug}
      className={`grid scroll-mt-24 items-center gap-8 sm:grid-cols-2 ${reverse ? 'sm:[&>*:first-child]:order-2' : ''}`}
    >
      <Placeholder alt={imageAlt} ratio="4 / 3" />
      <div>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-3 text-cream-200">{description}</p>
        <Button to="/preventivo" variant="outline" className="mt-6">
          Richiedi preventivo →
        </Button>
      </div>
    </div>
  )
}
