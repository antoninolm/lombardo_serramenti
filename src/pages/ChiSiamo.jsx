import Placeholder from '../components/Placeholder'
import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import CtaBanner from '../components/CtaBanner'
import useLanguage from '../i18n/useLanguage'

export default function ChiSiamo() {
  const { t } = useLanguage()
  const body = t('chiSiamo.body')

  return (
    <>
      <title>Chi Siamo — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow={t('nav.chiSiamo')} title={t('chiSiamo.title')} description={t('chiSiamo.subtitle')} />
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {body.map((paragrafo) => (
            <p key={paragrafo} className="text-cream-200">
              {paragrafo}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Placeholder alt="Officina di fabbro con banco da lavoro e attrezzi" ratio="21 / 9" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('chiSiamo.storiaTitle')}</h2>
        <Timeline />
      </section>

      <section className="pb-20">
        <CtaBanner title={t('chiSiamo.cta.title')} description={t('chiSiamo.cta.description')} />
      </section>
    </>
  )
}
