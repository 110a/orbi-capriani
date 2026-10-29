import sharp from 'sharp'

const names = ['5', '8', '7']
const widths = [480, 800, 1200, 1600]

for (const name of names) {
  for (const width of widths) {
    const height = Math.round(width * 1.25) // ratio 4:5
    await sharp(`public/images/${name}.png`)
      .resize(width, height, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80 })
      .toFile(`public/images/${name}-${width}.webp`)
    console.log(`done: ${name}-${width}.webp`)
  }
}
