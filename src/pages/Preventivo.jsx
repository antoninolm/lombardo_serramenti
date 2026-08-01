import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import PreventivoForm from '../components/forms/PreventivoForm'
import PreventivoSuccess from '../components/forms/PreventivoSuccess'

export default function Preventivo() {
  const [submittedName, setSubmittedName] = useState(null)

  return (
    <>
      <title>Richiedi Preventivo — Lombardo Serramenti</title>

      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Richiedi Preventivo"
          title="Raccontaci il tuo progetto."
          description="Compila il modulo con i dettagli del lavoro: ti ricontatteremo con un preventivo su misura, senza impegno."
        />

        {submittedName !== null ? (
          <PreventivoSuccess nome={submittedName} onReset={() => setSubmittedName(null)} />
        ) : (
          <PreventivoForm onSubmitted={setSubmittedName} />
        )}
      </section>
    </>
  )
}
