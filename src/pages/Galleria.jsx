import SectionHeading from '../components/SectionHeading'
import GalleryItem from '../components/GalleryItem'
import { galleriaItems } from '../data/galleria'

const EAGER_COUNT = 7

export default function Galleria() {
  return (
    <>
      <title>Galleria — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <SectionHeading
          eyebrow="Galleria"
          title="Le realizzazioni dell'officina."
          description="Cancelli, ringhiere, portoni e opere su misura: una selezione dei lavori usciti dalla nostra officina. Ogni pezzo è pensato e realizzato a mano, su misura per lo spazio che lo ospita."
        />
      </section>

      <div className="relative left-1/2 right-1/2 mt-8 w-screen -mx-[50vw] pb-16">
        <div className="grid grid-cols-2 gap-0 sm:grid-cols-4 xl:grid-cols-7">
          {galleriaItems.map((item, index) => (
            <GalleryItem key={item.id} src={item.src} alt={item.alt} eager={index < EAGER_COUNT} />
          ))}
        </div>
      </div>
    </>
  )
}
