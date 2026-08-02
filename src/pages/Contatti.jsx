import SectionHeading from '../components/SectionHeading'
import InfoCard from '../components/InfoCard'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import { contatti } from '../data/contatti'
import useLanguage from '../i18n/useLanguage'

export default function Contatti() {
  const { t } = useLanguage()
  return (
    <>
      <title>Contatti — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow={t('nav.contatti')} title={t('contatti.title')} />

        <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(280px,1fr)_minmax(280px,1.3fr)]">
          <div className="grid gap-4 sm:grid-cols-2 sm:self-start">
            <InfoCard title={t('contatti.cards.indirizzo')} lines={contatti.indirizzo} />
            <InfoCard title={t('contatti.cards.telefono')} lines={[contatti.telefono]} />
            <InfoCard title={t('contatti.cards.email')} lines={[contatti.email]} />
            <InfoCard title={t('contatti.cards.orari')} lines={t('common.orari')} />
          </div>
          <Placeholder
            alt="Mappa con la posizione dell'officina"
            caption={t('contatti.mapCaption')}
            ratio="4 / 3"
          />
        </div>
      </section>

      <section className="pb-20">
        <CtaBanner title={t('contatti.cta.title')} description={t('contatti.cta.description')} />
      </section>
    </>
  )
}
