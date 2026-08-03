import Placeholder from './Placeholder'
import Button from './Button'
import useLanguage from '../i18n/useLanguage'

export default function ZigZagBlock({ slug, title, description, imageAlt, reverse = false }) {
  const { t } = useLanguage()

  return (
    <div
      id={slug}
      className={`grid scroll-mt-24 items-center gap-8 sm:grid-cols-2 ${reverse ? 'sm:[&>*:first-child]:order-2' : ''}`}
    >
      <Placeholder alt={imageAlt} ratio="4 / 3" />
      <div>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-3 text-ink-500">{description}</p>
        <Button to="/preventivo" variant="outline" className="mt-6">
          {t('prodotti.ctaBottone')}
        </Button>
      </div>
    </div>
  )
}
