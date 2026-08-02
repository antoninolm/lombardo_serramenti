import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Carousel from './Carousel'

const items = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `foto${i + 1}.webp`,
  alt: `Foto ${i + 1}`,
}))

function renderCarousel() {
  return render(
    <Carousel
      items={items}
      ariaLabel="Carosello test"
      renderItem={(item) => <img src={item.src} alt={item.alt} />}
    />,
  )
}

describe('Carousel', () => {
  afterEach(() => {
    delete Element.prototype.scrollBy
  })

  it('renderizza tutti gli elementi', () => {
    renderCarousel()
    expect(screen.getAllByRole('img')).toHaveLength(14)
  })

  it('espone il contenitore come region con aria-label', () => {
    renderCarousel()
    expect(screen.getByRole('region', { name: 'Carosello test' })).toBeInTheDocument()
  })

  it('la freccia successiva chiama scrollBy sul contenitore', () => {
    const scrollBySpy = vi.fn()
    Element.prototype.scrollBy = scrollBySpy

    renderCarousel()
    fireEvent.click(screen.getByRole('button', { name: 'Foto successiva' }))

    expect(scrollBySpy).toHaveBeenCalledTimes(1)
    expect(scrollBySpy.mock.calls[0][0]).toMatchObject({ behavior: 'smooth' })
    expect(scrollBySpy.mock.calls[0][0].left).toBeGreaterThan(0)
  })

  it('la freccia precedente è disabilitata al primo elemento', () => {
    renderCarousel()
    expect(screen.getByRole('button', { name: 'Foto precedente' })).toBeDisabled()
  })
})
