import SectionHeading from '../components/SectionHeading'
import ZigZagBlock from '../components/ZigZagBlock'
import { prodotti } from '../data/prodotti'

export default function Prodotti() {
  return (
    <>
      <title>Prodotti — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Prodotti"
          title="Le nostre lavorazioni."
          description="Ogni lavoro è realizzato su misura, dal disegno alla posa in opera. Ecco le principali categorie di prodotti che realizziamo."
        />
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 sm:px-6">
        {prodotti.map((categoria, index) => (
          <ZigZagBlock key={categoria.slug} {...categoria} reverse={index % 2 === 1} />
        ))}
      </section>
    </>
  )
}
