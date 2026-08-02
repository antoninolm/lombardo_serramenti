import { useRef, useState } from 'react'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Carousel({
  items,
  renderItem,
  ariaLabel,
  prevLabel = 'Foto precedente',
  nextLabel = 'Foto successiva',
}) {
  const scrollerRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = (node) => {
    const maxScrollLeft = node.scrollWidth - node.clientWidth
    setCanScrollPrev(node.scrollLeft > 4)
    setCanScrollNext(node.scrollLeft < maxScrollLeft - 4)
  }

  const scroll = (direction) => {
    const node = scrollerRef.current
    if (!node) return
    const card = node.querySelector('[data-carousel-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : node.clientWidth
    node.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={prevLabel}
        onClick={() => scroll(-1)}
        disabled={!canScrollPrev}
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-iron-900/80 p-2 text-xl text-cream-50 transition-opacity hover:bg-ember-500 disabled:pointer-events-none disabled:opacity-0 sm:flex"
      >
        ‹
      </button>

      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        onScroll={(e) => updateScrollState(e.currentTarget)}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {items.map((item, index) => (
          <div key={item.id} data-carousel-card className="shrink-0 basis-[62%] snap-start sm:basis-[27%]">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => scroll(1)}
        disabled={!canScrollNext}
        className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-iron-900/80 p-2 text-xl text-cream-50 transition-opacity hover:bg-ember-500 disabled:pointer-events-none disabled:opacity-0 sm:flex"
      >
        ›
      </button>
    </div>
  )
}
