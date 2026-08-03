import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/nav'
import Button from '../components/Button'
import logo from '../assets/logo-lombardo-crop.png'
import useLanguage from '../i18n/useLanguage'
import LanguageToggle from '../i18n/LanguageToggle'

const linkClasses = ({ isActive }) =>
  `font-display text-sm font-medium uppercase tracking-wide transition-colors ${
    isActive ? 'text-ember-500' : 'text-ink-600 hover:text-ink-800'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [lastPathname, setLastPathname] = useState(location.pathname)
  const { t } = useLanguage()

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cream-300 bg-cream-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Lombardo Serramenti" className="h-8 w-auto" />
          <span className="hidden font-display text-[11px] uppercase tracking-[0.2em] text-ink-500 sm:inline">
            {t('nav.brandTagline')}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <Button to="/preventivo" variant="dark">{t('common.richiediPreventivo')}</Button>
        </div>

        <button
          type="button"
          aria-label={open ? t('nav.chiudiMenu') : t('nav.apriMenu')}
          aria-expanded={open}
          className="text-ink-800 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-cream-300 bg-cream-50 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {t(link.key)}
            </NavLink>
          ))}
          <LanguageToggle className="py-2" />
          <Button to="/preventivo" variant="dark" className="w-full text-center">
            {t('common.richiediPreventivo')}
          </Button>
        </div>
      )}
    </header>
  )
}
