import { readdir, mkdir } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'materiali/foto'
const OUT_DIR = 'src/assets/galleria'

const VARIANTS = [
  { dir: 'full', width: 1600, quality: 82 },
  { dir: 'thumb', width: 800, quality: 78 },
]

async function run() {
  const files = (await readdir(SRC_DIR))
    .filter((f) => /^galleria\d+\.jpe?g$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (files.length !== 14) {
    console.warn(`Attenzione: attese 14 foto sorgente, trovate ${files.length}`)
  }

  await Promise.all(VARIANTS.map((v) => mkdir(join(OUT_DIR, v.dir), { recursive: true })))

  for (const file of files) {
    const name = basename(file, extname(file))
    for (const variant of VARIANTS) {
      const outPath = join(OUT_DIR, variant.dir, `${name}.webp`)
      await sharp(join(SRC_DIR, file))
        .rotate()
        .resize({ width: variant.width, withoutEnlargement: true })
        .webp({ quality: variant.quality })
        .toFile(outPath)
      console.log(`✓ ${outPath}`)
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
