const milestones = [
  {
    year: '1968',
    title: 'Fondazione',
    text: 'Nasce l’officina, tra le prime della zona a lavorare il ferro battuto su misura per privati e imprese.',
  },
  {
    year: '1987',
    title: 'Seconda generazione',
    text: 'L’attività passa ai figli del fondatore, che introducono le prime lavorazioni in acciaio zincato e inox.',
  },
  {
    year: '2005',
    title: 'Nuova sede',
    text: 'Trasferimento in un’officina più ampia, con nuovi macchinari per portoni e serrande su misura.',
  },
  {
    year: 'Oggi',
    title: 'Terza generazione',
    text: 'L’officina continua a crescere restando fedele al lavoro artigianale, un pezzo alla volta.',
  },
]

export default function Timeline() {
  return (
    <div className="divide-y divide-iron-500 border-t border-iron-500">
      {milestones.map((milestone) => (
        <div key={milestone.year} className="grid gap-2 py-6 sm:grid-cols-[100px_1fr] sm:gap-6">
          <p className="font-display text-lg font-bold text-ember-500">{milestone.year}</p>
          <div>
            <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
            <p className="mt-1 text-cream-200">{milestone.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
