import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import ChiSiamo from './ChiSiamo'

function renderChiSiamo() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <LanguageToggle />
        <ChiSiamo />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('ChiSiamo', () => {
  it('mostra il sottotitolo in italiano di default', () => {
    renderChiSiamo()
    expect(screen.getByText('Il ferro è una cosa di famiglia.')).toBeInTheDocument()
  })

  it('mostra il sottotitolo in siciliano dopo il toggle', () => {
    renderChiSiamo()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByText('U ferru è na cosa di famigghia.')).toBeInTheDocument()
  })
})
