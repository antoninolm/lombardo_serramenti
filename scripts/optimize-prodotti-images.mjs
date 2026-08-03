import { mkdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'materiali/foto-prodotti'
const OUT_DIR = 'src/assets/prodotti'

// I nomi file forniti dal cliente non seguono lo slug delle categorie in prodotti.js
const FILES_TO_SLUG = {
  'cancelli.jpeg': 'cancelli',
  'ringhiere e balaustre.jpeg': 'ringhiere',
  'portoni e serrande.jpeg': 'portoni',
  'inferriate e grate di sicurezza.jpeg': 'inferriate',
  'opere su misura.jpeg': 'su-misura',
}

const WIDTH = 1200
const QUALITY = 80

async function run() {
  await mkdir(OUT_DIR, { recursive: true })

  let totalOriginal = 0
  let totalOptimized = 0

  for (const [file, slug] of Object.entries(FILES_TO_SLUG)) {
    const srcPath = join(SRC_DIR, file)
    const outPath = join(OUT_DIR, `${slug}.webp`)

    const { size: originalSize } = await stat(srcPath)

    await sharp(srcPath)
      .rotate()
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)

    const { size: optimizedSize } = await stat(outPath)

    totalOriginal += originalSize
    totalOptimized += optimizedSize

    console.log(
      `✓ ${outPath} (${(originalSize / 1024).toFixed(0)} KB → ${(optimizedSize / 1024).toFixed(0)} KB)`,
    )
  }

  console.log(
    `\nTotale: ${(totalOriginal / 1024).toFixed(0)} KB → ${(totalOptimized / 1024).toFixed(0)} KB`,
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
