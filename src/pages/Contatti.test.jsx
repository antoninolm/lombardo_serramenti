import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import Contatti from './Contatti'

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
})
