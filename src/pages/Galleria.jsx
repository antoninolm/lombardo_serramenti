import SectionHeading from '../components/SectionHeading'
import GalleryItem from '../components/GalleryItem'
import { galleriaItems } from '../data/galleria'

const EAGER_COUNT = 6

export default function Galleria() {
  return (
    <>
      <title>Galleria — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Galleria"
          title="Le realizzazioni dell'officina."
          description="Cancelli, ringhiere, portoni e opere su misura: una selezione dei lavori usciti dalla nostra officina. Ogni pezzo è pensato e realizzato a mano, su misura per lo spazio che lo ospita."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleriaItems.map((item, index) => (
            <GalleryItem key={item.id} src={item.src} alt={item.alt} eager={index < EAGER_COUNT} />
          ))}
        </div>
      </section>
    </>
  )
}
