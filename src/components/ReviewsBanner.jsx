import Button from './Button'
import useLanguage from '../i18n/useLanguage'

// Stessa scheda Google Business già linkata in Contatti.jsx (MAPS_PLACE_URL);
// tenuta locale qui per rispettare la recinzione del task (nessuna modifica a Contatti.jsx/data/contatti.js)
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Lombardo+Serramenti/@37.9010322,15.0529788,17z/data=!3m1!4b1!4m6!3m5!1s0x13141dcbe5e5810b:0xcc535a62c01cbef!8m2!3d37.9010322!4d15.0529788!16s%2Fg%2F11ntm_kphv?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D'

export default function ReviewsBanner() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-xl border border-cream-300 bg-white px-6 py-12 text-center sm:px-12">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('home.dicono.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-500">{t('home.dicono.subtitle')}</p>
        <div className="mt-6">
          <Button
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            aria-label={t('home.dicono.linkAriaLabel')}
          >
            {t('home.dicono.linkLabel')}
          </Button>
        </div>
      </div>
    </div>
  )
}
