import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from './LanguageContext'
import LanguageToggle from './LanguageToggle'

describe('LanguageToggle', () => {
  it('mostra ITA come lingua attiva di default', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>,
    )
    expect(screen.getByRole('button', { name: 'ITA' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'SIC' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('click su SIC cambia lo stato attivo', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByRole('button', { name: 'SIC' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'ITA' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('espone un role group con aria-label', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>,
    )
    expect(screen.getByRole('group', { name: 'Lingua' })).toBeInTheDocument()
  })
})
