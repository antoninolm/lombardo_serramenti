import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Placeholder from '../components/Placeholder'
import SectionHeading from '../components/SectionHeading'
import FeatureCard from '../components/FeatureCard'
import CategoryCard from '../components/CategoryCard'
import StatsBand from '../components/StatsBand'
import CtaBanner from '../components/CtaBanner'
import { prodotti } from '../data/prodotti'
import realizzazione1 from '../assets/galleria/thumb/galleria9.webp'
import realizzazione2 from '../assets/galleria/thumb/galleria10.webp'
import realizzazione3 from '../assets/galleria/thumb/galleria12.webp'

const features = [
  {
    title: 'Lavorazione artigianale',
    description: 'Ogni pezzo è disegnato e lavorato a mano in officina, non assemblato da componenti standard.',
  },
  {
    title: 'Materiali di qualità',
    description: 'Ferro battuto, acciaio zincato e inox selezionati per resistere nel tempo alle intemperie.',
  },
  {
    title: 'Su misura per te',
    description: 'Sopralluogo, disegno e realizzazione calibrati sulle misure e lo stile della tua casa.',
  },
  {
    title: 'Assistenza nel tempo',
    description: 'Manutenzione e riparazioni anche a distanza di anni dall’installazione.',
  },
]

const realizzazioni = [
  { alt: 'Scala esterna con ringhiera in ferro zincato', src: realizzazione1 },
  { alt: 'Ringhiera per scala interna in acciaio inox', src: realizzazione2 },
  { alt: 'Cappa camino su misura in lamiera di ferro', src: realizzazione3 },
]

export default function Home() {
  return (
    <>
      <title>Lombardo Serramenti — Il ferro è il nostro mestiere</title>

      <section className="relative overflow-hidden">
        <Placeholder alt="Fabbro al lavoro sul ferro battuto, scintille di saldatura" fill />
        <div className="absolute inset-0 bg-iron-900/70" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-28 sm:px-6">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-ember-500">
            Officina Artigiana
          </span>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Il ferro si piega alla tua idea.
          </h1>
          <p className="max-w-xl text-cream-200">
            Cancelli, ringhiere, portoni e opere su misura, disegnate e realizzate a mano dalla nostra
            officina. Il ferro è il nostro mestiere.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to="/preventivo">Richiedi Preventivo</Button>
            <Button to="/prodotti" variant="outline">
              Scopri i prodotti
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Perché scegliere noi" title="Un mestiere, tre generazioni." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Prodotti"
          title="Le nostre lavorazioni"
          action={
            <Link to="/prodotti" className="font-display text-sm font-semibold text-ember-500 hover:underline">
              Vedi tutti i prodotti →
            </Link>
          }
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {prodotti.map((categoria) => (
            <CategoryCard key={categoria.slug} {...categoria} />
          ))}
        </div>
      </section>

      <StatsBand />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Galleria"
          title="Dalle nostre realizzazioni"
          action={
            <Link to="/galleria" className="font-display text-sm font-semibold text-ember-500 hover:underline">
              Galleria completa →
            </Link>
          }
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {realizzazioni.map((foto) => (
            <img
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </section>

      <section className="pb-20">
        <CtaBanner
          title="Hai un progetto in mente?"
          description="Raccontaci il tuo progetto: ti rispondiamo con un preventivo su misura, senza impegno."
          primary={{ to: '/preventivo', label: 'Richiedi Preventivo' }}
          secondary={{ href: 'tel:+390000000000', label: 'Chiamaci' }}
        />
      </section>
    </>
  )
}
