import { Link } from 'react-router-dom'
import { navLinks } from '../data/nav'
import { contatti } from '../data/contatti'
import useLanguage from '../i18n/useLanguage'

function CopyrightBar({ t }) {
  return (
    <div className="border-t border-iron-500 bg-iron-900 px-4 py-4 text-center text-xs text-cream-400">
      © {new Date().getFullYear()} {t('footer.copyright')}
    </div>
  )
}

export default function Footer({ variant = 'simple' }) {
  const { t } = useLanguage()

  if (variant !== 'expanded') {
    return (
      <footer className="mt-auto">
        <CopyrightBar t={t} />
      </footer>
    )
  }

  return (
    <footer className="mt-auto">
      <div className="bg-iron-900 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-cream-50">Lombardo Serramenti</p>
            <p className="mt-2 text-sm text-cream-400">{t('footer.tagline')}</p>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-cream-200">
              {t('footer.naviga')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cream-400">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-cream-50">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-cream-200">
              {t('footer.contattiTitolo')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cream-400">
              {contatti.indirizzo.map((riga) => (
                <li key={riga}>{riga}</li>
              ))}
              <li>{contatti.telefono}</li>
              <li>{contatti.email}</li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-cream-200">
              {t('footer.orariTitolo')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cream-400">
              {t('common.orari').map((riga) => (
                <li key={riga}>{riga}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CopyrightBar t={t} />
    </footer>
  )
}
