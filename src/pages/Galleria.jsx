import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import GalleryFilter from '../components/GalleryFilter'
import GalleryGrid from '../components/GalleryGrid'
import { galleriaItems } from '../data/galleria'

export default function Galleria() {
  const [filter, setFilter] = useState('tutti')

  const visibleItems =
    filter === 'tutti' ? galleriaItems : galleriaItems.filter((item) => item.category === filter)

  return (
    <>
      <title>Galleria — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Galleria" title="Le realizzazioni dell'officina." />
        <div className="mt-8">
          <GalleryFilter value={filter} onChange={setFilter} />
        </div>
        <div className="mt-8">
          <GalleryGrid items={visibleItems} />
        </div>
      </section>
    </>
  )
}
