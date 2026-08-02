import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import Navbar from './Navbar'

function renderNavbar() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('Navbar', () => {
  it('mostra le voci di menu in italiano di default', () => {
    renderNavbar()
    const desktopNav = screen.getAllByRole('navigation')[0]
    expect(within(desktopNav).getByText('Chi Siamo')).toBeInTheDocument()
    expect(within(desktopNav).getByText('Contatti')).toBeInTheDocument()
  })

  it('click sul toggle SIC cambia le label del menu in siciliano e viceversa', () => {
    renderNavbar()
    const desktopNav = screen.getAllByRole('navigation')[0]
    expect(within(desktopNav).getByText('Chi Siamo')).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'SIC' })[0])
    expect(within(desktopNav).getByText('Cu semu')).toBeInTheDocument()
    expect(within(desktopNav).queryByText('Chi Siamo')).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'ITA' })[0])
    expect(within(desktopNav).getByText('Chi Siamo')).toBeInTheDocument()
  })
})
