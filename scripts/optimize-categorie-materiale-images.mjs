import { mkdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'materiali/categorie_prodotti'
const OUT_DIR = 'src/assets/categorie-materiale'

const SLUGS = ['ferro', 'acciaio', 'alluminio']

const WIDTH = 1200
const QUALITY = 80

async function run() {
  await mkdir(OUT_DIR, { recursive: true })

  let totalOriginal = 0
  let totalOptimized = 0

  for (const slug of SLUGS) {
    const srcPath = join(SRC_DIR, `${slug}.jpeg`)
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
