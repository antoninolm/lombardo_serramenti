import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/nav'
import Button from '../components/Button'
import logo from '../assets/logo-lombardo.png'

const linkClasses = ({ isActive }) =>
  `font-display text-sm font-medium uppercase tracking-wide transition-colors ${
    isActive ? 'text-ember-500' : 'text-cream-200 hover:text-cream-50'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [lastPathname, setLastPathname] = useState(location.pathname)

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-iron-500 bg-iron-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Lombardo Serramenti" className="h-9 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/preventivo">Richiedi Preventivo</Button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
          className="text-cream-50 md:hidden"
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
        <div className="flex flex-col gap-4 border-t border-iron-500 bg-iron-700 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
          <Button to="/preventivo" className="w-full text-center">
            Richiedi Preventivo
          </Button>
        </div>
      )}
    </header>
  )
}
