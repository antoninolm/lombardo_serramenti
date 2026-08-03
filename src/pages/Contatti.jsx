import SectionHeading from '../components/SectionHeading'
import InfoCard from '../components/InfoCard'
import CtaBanner from '../components/CtaBanner'
import { contatti } from '../data/contatti'
import useLanguage from '../i18n/useLanguage'

const MAPS_EMBED_SRC = 'https://www.google.com/maps?q=37.9010322,15.0529788&output=embed'
const MAPS_PLACE_URL =
  'https://www.google.com/maps/place/Lombardo+Serramenti/@37.9010322,15.0529788,17z/data=!3m1!4b1!4m6!3m5!1s0x13141dcbe5e5810b:0xcc535a62c01cbef!8m2!3d37.9010322!4d15.0529788!16s%2Fg%2F11ntm_kphv?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D'

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
          <div className="flex flex-col gap-3">
            <div
              className="relative w-full overflow-hidden rounded-lg border border-cream-300"
              style={{ aspectRatio: '4 / 3' }}
            >
              <iframe
                src={MAPS_EMBED_SRC}
                title={t('contatti.mapTitle')}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-display text-sm font-semibold text-ember-500 hover:underline"
            >
              {t('contatti.mapLink')}
            </a>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <CtaBanner title={t('contatti.cta.title')} description={t('contatti.cta.description')} />
      </section>
    </>
  )
}
