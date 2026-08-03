import sharp from 'sharp'

const SRC = 'materiali/brand/logo-lombardo.png'
const OUT = 'src/assets/logo-lombardo-crop.png'

// Il sorgente (718×717) ha sfondo bianco pieno, una sottile cornice scura
// sul perimetro e una timbratura in basso a sinistra. Coordinate fisse
// (ricavate da un'ispezione pixel-level di questo file specifico) che
// ritagliano stretto attorno alla scritta escludendo cornice e timbratura.
const CROP = { left: 90, top: 258, width: 542, height: 202 }

// Il file sorgente non ha trasparenza reale (alpha sempre 255). Per ottenere
// uno sfondo trasparente da un'immagine con sfondo bianco pieno e testo
// colorato, si stima l'alpha per pixel dalla "distanza dal bianco" (quanto
// il canale più scuro si scosta da 255) e si decontamina il colore
// (si rimuove il contributo del bianco di sfondo) per evitare aloni chiari
// sui bordi anti-aliasati una volta composto su uno sfondo diverso dal bianco.
function keyOutWhite(data) {
  const out = Buffer.alloc(data.length)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const alpha = 255 - Math.min(r, g, b)

    if (alpha === 0) {
      out[i] = 0
      out[i + 1] = 0
      out[i + 2] = 0
      out[i + 3] = 0
      continue
    }

    const a = alpha / 255
    out[i] = Math.max(0, Math.min(255, Math.round((r - (1 - a) * 255) / a)))
    out[i + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - a) * 255) / a)))
    out[i + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - a) * 255) / a)))
    out[i + 3] = alpha
  }
  return out
}

async function run() {
  const { data, info } = await sharp(SRC)
    .extract(CROP)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const keyed = keyOutWhite(data)

  await sharp(keyed, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(OUT)

  console.log(`✓ ${OUT}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
