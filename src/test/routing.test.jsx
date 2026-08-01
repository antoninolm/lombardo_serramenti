import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from '../router'

const titles = {
  '/': 'Lombardo Serramenti — Il ferro è il nostro mestiere',
  '/chi-siamo': 'Chi Siamo — Lombardo Serramenti',
  '/prodotti': 'Prodotti — Lombardo Serramenti',
  '/galleria': 'Galleria — Lombardo Serramenti',
  '/contatti': 'Contatti — Lombardo Serramenti',
  '/preventivo': 'Richiedi Preventivo — Lombardo Serramenti',
}

it("renderizza l'app con header e footer", () => {
  render(
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>,
  )
  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})

describe.each(Object.entries(titles))('route %s', (path, expectedTitle) => {
  it('mostra il titolo corretto', async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )
    await waitFor(() => expect(document.title).toBe(expectedTitle))
  })
})
