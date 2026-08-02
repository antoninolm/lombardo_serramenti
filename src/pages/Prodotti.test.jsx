import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import Prodotti from './Prodotti'

function renderProdotti() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <LanguageToggle />
        <Prodotti />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('Prodotti', () => {
  it('mostra i nomi delle categorie in italiano di default', () => {
    renderProdotti()
    expect(screen.getByRole('heading', { name: 'Cancelli' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Opere su Misura' })).toBeInTheDocument()
  })

  it('mostra i nomi delle categorie in siciliano dopo il toggle', () => {
    renderProdotti()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByRole('heading', { name: 'Cancelli' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Travagghi supra Misura' })).toBeInTheDocument()
  })
})
