import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Placeholder from '../components/Placeholder'
import SectionHeading from '../components/SectionHeading'
import FeatureCard from '../components/FeatureCard'
import CategoryCard from '../components/CategoryCard'
import StatsBand from '../components/StatsBand'
import CtaBanner from '../components/CtaBanner'
import Carousel from '../components/Carousel'
import { prodotti } from '../data/prodotti'
import { galleriaItems } from '../data/galleria'
import useLanguage from '../i18n/useLanguage'

const REALIZZAZIONI_EAGER_COUNT = 4

export default function Home() {
  const { t } = useLanguage()
  const features = t('home.features')

  return (
    <>
      <title>Lombardo Serramenti — Il ferro è il nostro mestiere</title>

      <section className="relative overflow-hidden">
        <Placeholder alt="Fabbro al lavoro sul ferro battuto, scintille di saldatura" fill />
        <div className="absolute inset-0 bg-iron-900/70" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-28 sm:px-6">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-ember-500">
            {t('home.hero.eyebrow')}
          </span>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t('home.hero.claim')}
          </h1>
          <p className="max-w-xl text-cream-200">{t('home.hero.secondary')}</p>
          <div className="flex flex-wrap gap-4">
            <Button to="/preventivo">{t('common.richiediPreventivo')}</Button>
            <Button to="/prodotti" variant="outline">
              {t('home.ctaScopriProdotti')}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow={t('home.perche.eyebrow')} title={t('home.perche.title')} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t('home.prodottiSection.eyebrow')}
          title={t('home.prodottiSection.title')}
          action={
            <Link to="/prodotti" className="font-display text-sm font-semibold text-ember-500 hover:underline">
              {t('home.prodottiSection.link')}
            </Link>
          }
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {prodotti.map((categoria) => (
            <CategoryCard
              key={categoria.slug}
              slug={categoria.slug}
              imageAlt={categoria.imageAlt}
              title={t(`prodotti.${categoria.slug}.title`)}
            />
          ))}
        </div>
      </section>

      <StatsBand />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t('home.galleria.eyebrow')}
          title={t('home.galleria.title')}
          action={
            <Link to="/galleria" className="font-display text-sm font-semibold text-ember-500 hover:underline">
              {t('home.galleria.link')}
            </Link>
          }
        />
        <div className="mt-8">
          <Carousel
            items={galleriaItems}
            ariaLabel={t('home.galleria.carouselAriaLabel')}
            prevLabel={t('home.galleria.prev')}
            nextLabel={t('home.galleria.next')}
            renderItem={(item, index) => (
              <img
                src={item.src}
                alt={item.alt}
                loading={index < REALIZZAZIONI_EAGER_COUNT ? 'eager' : 'lazy'}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            )}
          />
        </div>
      </section>

      <section className="pb-20">
        <CtaBanner
          title={t('home.ctaFinale.title')}
          description={t('home.ctaFinale.description')}
          primary={{ to: '/preventivo', label: t('common.richiediPreventivo') }}
          secondary={{ href: 'tel:+390000000000', label: t('common.chiamaci') }}
        />
      </section>
    </>
  )
}
