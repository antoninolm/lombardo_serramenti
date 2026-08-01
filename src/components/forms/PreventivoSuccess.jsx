import Button from '../Button'

export default function PreventivoSuccess({ nome, onReset }) {
  return (
    <div className="mt-8 rounded-lg border border-ember-500/40 bg-iron-600 p-8 text-center">
      <h2 className="font-display text-2xl font-bold">Richiesta inviata, {nome || 'grazie'}!</h2>
      <p className="mt-3 text-cream-200">
        Abbiamo ricevuto la tua richiesta di preventivo. Ti ricontatteremo il prima possibile.
      </p>
      <p className="mt-1 text-xs text-cream-400">
        (Simulazione — Fase 2: nessuna email è stata realmente inviata.)
      </p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        Compila un&apos;altra richiesta
      </Button>
    </div>
  )
}
