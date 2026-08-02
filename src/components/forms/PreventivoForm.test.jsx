import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageContext'
import PreventivoForm from './PreventivoForm'

function renderForm(onSubmitted = vi.fn()) {
  return render(
    <LanguageProvider>
      <PreventivoForm onSubmitted={onSubmitted} />
    </LanguageProvider>,
  )
}

describe('PreventivoForm', () => {
  it('elenca le categorie prodotto tradotte come opzioni del tipo di lavoro', () => {
    renderForm()
    const select = screen.getByLabelText('Tipo di lavoro')
    expect(within(select).getByRole('option', { name: 'Cancelli' })).toBeInTheDocument()
    expect(within(select).getByRole('option', { name: 'Altro' })).toBeInTheDocument()
  })
})
