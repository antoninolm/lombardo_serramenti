import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import Contatti from './Contatti'

beforeEach(() => {
  window.localStorage.clear()
})

function renderContatti() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <LanguageToggle />
        <Contatti />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('Contatti', () => {
  it('mostra i titoli delle card in italiano di default', () => {
    renderContatti()
    expect(screen.getByText('Indirizzo')).toBeInTheDocument()
    expect(screen.getByText('Orari')).toBeInTheDocument()
    expect(screen.getByText('Dom: chiuso')).toBeInTheDocument()
  })

  it('mostra i titoli delle card in siciliano dopo il toggle', () => {
    renderContatti()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByText('Indirizzu')).toBeInTheDocument()
    expect(screen.getByText('Duminica: chiusu')).toBeInTheDocument()
  })

  it('mostra la mappa embed e il link a Google Maps in italiano', () => {
    renderContatti()
    const iframe = screen.getByTitle('Mappa: Lombardo Serramenti, Viale Europa 44, Moio Alcantara')
    expect(iframe).toBeInTheDocument()
    expect(iframe.tagName).toBe('IFRAME')
    expect(iframe).toHaveAttribute('src', 'https://www.google.com/maps?q=37.9010322,15.0529788&output=embed')
    const link = screen.getByRole('link', { name: 'Apri in Google Maps →' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toContain('google.com/maps/place/Lombardo+Serramenti')
  })

  it('mostra il link a Google Maps in siciliano dopo il toggle', () => {
    renderContatti()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByRole('link', { name: 'Rapri in Google Maps →' })).toBeInTheDocument()
  })

  it('mostra telefono ed email come link cliccabili in italiano', () => {
    renderContatti()
    expect(screen.getByRole('link', { name: '+39 366 547 2502' })).toHaveAttribute('href', 'tel:+393665472502')
    expect(screen.getByRole('link', { name: 'lombardoserramenti.contatti@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:lombardoserramenti.contatti@gmail.com',
    )
  })

  it('mostra telefono ed email come link cliccabili in siciliano dopo il toggle', () => {
    renderContatti()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByRole('link', { name: '+39 366 547 2502' })).toHaveAttribute('href', 'tel:+393665472502')
    expect(screen.getByRole('link', { name: 'lombardoserramenti.contatti@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:lombardoserramenti.contatti@gmail.com',
    )
  })
})
