import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import PreventivoForm from '../components/forms/PreventivoForm'
import PreventivoSuccess from '../components/forms/PreventivoSuccess'
import useLanguage from '../i18n/useLanguage'

export default function Preventivo() {
  const { t } = useLanguage()
  const [submittedName, setSubmittedName] = useState(null)

  return (
    <>
      <title>Richiedi Preventivo — Lombardo Serramenti</title>

      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t('common.richiediPreventivo')}
          title={t('preventivo.pageTitle')}
          description={t('preventivo.pageDescription')}
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
