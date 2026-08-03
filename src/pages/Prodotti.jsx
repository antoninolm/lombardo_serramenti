import SectionHeading from '../components/SectionHeading'
import ZigZagBlock from '../components/ZigZagBlock'
import { prodotti } from '../data/prodotti'
import useLanguage from '../i18n/useLanguage'

export default function Prodotti() {
  const { t } = useLanguage()

  return (
    <>
      <title>Prodotti — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t('nav.prodotti')}
          title={t('prodotti.pageTitle')}
          description={t('prodotti.pageDescription')}
        />
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 sm:px-6">
        {prodotti.map((categoria, index) => (
          <ZigZagBlock
            key={categoria.slug}
            slug={categoria.slug}
            image={categoria.image}
            imageAlt={categoria.imageAlt}
            title={t(`prodotti.${categoria.slug}.title`)}
            description={t(`prodotti.${categoria.slug}.description`)}
            reverse={index % 2 === 1}
          />
        ))}
      </section>
    </>
  )
}
