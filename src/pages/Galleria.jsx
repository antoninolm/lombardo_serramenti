import SectionHeading from '../components/SectionHeading'
import GalleryItem from '../components/GalleryItem'
import { galleriaItems } from '../data/galleria'

const EAGER_COUNT = 4

export default function Galleria() {
  return (
    <>
      <title>Galleria — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 pt-8 pb-0 sm:px-6">
        <SectionHeading
          eyebrow="Galleria"
          title="Le realizzazioni dell'officina."
          description="Cancelli, ringhiere, portoni e opere su misura: una selezione dei lavori usciti dalla nostra officina. Ogni pezzo è pensato e realizzato a mano, su misura per lo spazio che lo ospita."
        />
      </section>

      <div className="mx-auto mt-10 w-full max-w-[1400px] pb-16">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
          {galleriaItems.map((item, index) => (
            <GalleryItem key={item.id} src={item.src} alt={item.alt} eager={index < EAGER_COUNT} />
          ))}
        </div>
      </div>
    </>
  )
}
