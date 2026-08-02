import { readdir, readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const SCAN_DIRS = ['src/pages', 'src/layout', 'src/components']

// Stringhe italiane visibili note, inventariate prima della centralizzazione i18n
// (Fase 3c). Se una di queste ricompare fuori da src/i18n/dictionaries/, significa
// che è tornata hardcoded in un componente e va spostata in un dizionario.
const DENYLIST = [
  'Chi Siamo',
  'Richiedi Preventivo',
  'Scopri i prodotti',
  'Chiamaci',
  'Il ferro si piega alla tua idea',
  'Un mestiere, tre generazioni',
  'Lavorazione artigianale',
  'Materiali di qualità',
  'Su misura per te',
  'Assistenza nel tempo',
  'Le nostre lavorazioni',
  'Dalle nostre realizzazioni',
  'Galleria completa',
  'Hai un progetto in mente',
  'Anni di esperienza',
  'Lavori realizzati',
  'Generazioni in officina',
  'Lavorazioni artigianali',
  'Tre generazioni, un solo mestiere',
  'La nostra storia',
  'Fondazione',
  'Seconda generazione',
  'Nuova sede',
  'Terza generazione',
  'Vuoi conoscerci di persona',
  'Vieni a trovarci in officina',
  'Preferisci un preventivo scritto',
  'Raccontaci il tuo progetto',
  'Nome e Cognome',
  'Tipo di lavoro',
  'Seleziona…',
  'Descrizione del lavoro',
  'Accetto il trattamento',
  'Invia Richiesta',
  'Invio in corso',
  'Inserisci il tuo nome',
  'Inserisci un numero',
  'Inserisci un indirizzo',
  'Richiesta inviata',
  "Compila un'altra richiesta",
  'Apri menu',
  'Chiudi menu',
  'Naviga',
  'Officina artigiana di fabbro',
]

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) return collectFiles(fullPath)
      if (extname(entry.name) === '.jsx' && !entry.name.endsWith('.test.jsx')) return [fullPath]
      return []
    }),
  )
  return files.flat()
}

async function run() {
  const allFiles = (await Promise.all(SCAN_DIRS.map(collectFiles))).flat()
  const hits = []

  for (const file of allFiles) {
    const content = await readFile(file, 'utf8')
    const lines = content.split('\n')
    for (const phrase of DENYLIST) {
      lines.forEach((line, index) => {
        // <title> resta sempre in italiano per scelta esplicita (SEO), non è un refuso
        if (line.includes('<title>')) return
        if (line.includes(phrase)) {
          hits.push(`${file}:${index + 1}: "${phrase}"`)
        }
      })
    }
  }

  if (hits.length > 0) {
    console.error('Trovate stringhe italiane hardcoded fuori dai dizionari i18n:')
    hits.forEach((hit) => console.error(`  ${hit}`))
    process.exitCode = 1
    return
  }

  console.log(`OK: nessuna stringa della denylist trovata hardcoded (${allFiles.length} file .jsx controllati).`)
}

run()
