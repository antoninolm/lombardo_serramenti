import Placeholder from '../components/Placeholder'
import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import CtaBanner from '../components/CtaBanner'

export default function ChiSiamo() {
  return (
    <>
      <title>Chi Siamo — Lombardo Serramenti</title>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Chi Siamo" title="Tre generazioni, un solo mestiere." />
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <p className="text-cream-200">
            Lombardo Serramenti nasce come piccola officina di fabbro e cresce, di generazione in
            generazione, senza mai perdere il legame con il lavoro manuale del ferro.
          </p>
          <p className="text-cream-200">
            Oggi affianchiamo alle tecniche tradizionali macchinari moderni, ma ogni cancello,
            ringhiera o portone resta disegnato e seguito da noi, dal primo sopralluogo alla posa.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Placeholder alt="Officina di fabbro con banco da lavoro e attrezzi" ratio="21 / 9" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">La nostra storia</h2>
        <Timeline />
      </section>

      <section className="pb-20">
        <CtaBanner
          title="Vuoi conoscerci di persona?"
          description="Vieni a trovarci in officina o raccontaci il tuo progetto: ti prepariamo un preventivo su misura."
        />
      </section>
    </>
  )
}
