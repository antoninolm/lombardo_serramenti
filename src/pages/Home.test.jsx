import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import Home from './Home'

function renderHome() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <LanguageToggle />
        <Home />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('Home', () => {
  it('renderizza il claim hero in italiano di default', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Il ferro è il nostro mestiere.')
  })

  it('renderizza il claim hero in siciliano dopo il toggle', () => {
    renderHome()
    fireEvent.click(screen.getByRole('button', { name: 'SIC' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('U ferru è u nostru misteri.')
  })
})
