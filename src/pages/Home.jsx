import { Link } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import FeatureCard from '../components/FeatureCard'
import CategoryCard from '../components/CategoryCard'
import StatsBand from '../components/StatsBand'
import CtaBanner from '../components/CtaBanner'
import Carousel from '../components/Carousel'
import ReviewsBanner from '../components/ReviewsBanner'
import { prodotti } from '../data/prodotti'
import { galleriaItems } from '../data/galleria'
import useLanguage from '../i18n/useLanguage'
import useRotator from '../hooks/useRotator'
import logo from '../assets/logo-lombardo-crop.png'

const REALIZZAZIONI_EAGER_COUNT = 4

function HeroQuote({ quotes }) {
  const { index, entered } = useRotator(quotes)
  return (
    <div>
      <p
        className={`min-h-[4.5rem] max-w-xl text-ink-500 transition-all duration-500 ease-out motion-reduce:transition-none sm:min-h-[3rem] ${
          entered ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
        }`}
      >
        {quotes[index]}
      </p>
    </div>
  )
}

export default function Home() {
  const { t, lang } = useLanguage()
  const features = t('home.features')
  const quotes = t('home.hero.quotes')

  return (
    <>
      <title>Lombardo Serramenti — Il ferro è il nostro mestiere</title>

      <section
        className="bg-cream-50"
        style={{ minHeight: 'clamp(560px, 84vh, 800px)' }}
      >
        <div className="mx-auto grid h-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(280px,560px)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-ember-500">
              {t('home.hero.eyebrow')}
            </span>
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-ink-800 sm:text-5xl">
              {t('home.hero.claim')}
            </h1>
            <p className="font-display italic text-ember-500">«{t('home.hero.subclaim')}»</p>
            <HeroQuote key={lang} quotes={quotes} />
            <div className="flex flex-wrap gap-4">
              <Button to="/preventivo">{t('common.richiediPreventivo')}</Button>
              <Button to="/prodotti" variant="outline">
                {t('home.ctaScopriProdotti')}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img src={logo} alt="Lombardo Serramenti" className="w-full max-w-[480px]" />
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
              image={categoria.image}
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

      <section className="py-16">
        <ReviewsBanner />
      </section>

      <section className="pb-20">
        <CtaBanner
          title={t('home.ctaFinale.title')}
          description={t('home.ctaFinale.description')}
          primary={{ to: '/preventivo', label: t('common.richiediPreventivo') }}
        />
      </section>
    </>
  )
}
