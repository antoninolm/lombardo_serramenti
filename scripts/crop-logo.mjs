import sharp from 'sharp'

const SRC = 'materiali/brand/logo-lombardo.png'
const OUT = 'src/assets/logo-lombardo-crop.png'

// Il sorgente (718×717) ha sfondo bianco pieno, una sottile cornice scura
// sul perimetro e una timbratura in basso a sinistra. Coordinate fisse
// (ricavate da un'ispezione pixel-level di questo file specifico) che
// ritagliano stretto attorno alla scritta escludendo cornice e timbratura.
const CROP = { left: 90, top: 258, width: 542, height: 202 }

async function run() {
  await sharp(SRC).extract(CROP).toFile(OUT)
  console.log(`✓ ${OUT}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
