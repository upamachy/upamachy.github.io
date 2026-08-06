import { readFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const publicDir = path.join(root, "public")

const faviconSvg = await readFile(path.join(publicDir, "favicon.svg"))

for (const [name, size] of [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
]) {
  await sharp(faviconSvg, { density: 512 })
    .resize(size, size)
    .png()
    .toFile(path.join(publicDir, name))
}

const width = 1200
const height = 630
const splitX = 720

const INK = "#1a1410"
const PAPER = "#fdf3df"
const MARIGOLD = "#ffc233"
const TOMATO = "#e8503a"
const TEAL = "#1fa9a0"
const SKY = "#7ec8e3"
const BARK = "#8a5a2b"

const photoSize = 150
const photo = await sharp(path.join(publicDir, "upama.jpg"))
  .resize(photoSize, photoSize, { fit: "cover" })
  .png()
  .toBuffer()
const mask = Buffer.from(
  `<svg width="${photoSize}" height="${photoSize}"><circle cx="${photoSize / 2}" cy="${photoSize / 2}" r="${photoSize / 2}" fill="#fff"/></svg>`
)
const roundPhoto = await sharp(photo).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer()

const dots = Array.from({ length: 34 }, (_, row) =>
  Array.from({ length: 38 }, (_, column) =>
    `<circle cx="${column * 19 + 9}" cy="${row * 19 + 9}" r="1.6" fill="${INK}" opacity="0.15"/>`
  ).join("")
).join("")

const bird = `
  <g transform="translate(866 196) scale(4.3)">
    <path d="M28 12c2 4 6 5 9 3-1 4-3 6-6 7 3 1 6 0 8-2-1 5-4 7-8 8"
      transform="translate(1 -9) scale(1.18) translate(-4 0)"
      fill="${MARIGOLD}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M40 30a14 13 0 1 1-24 9c0-8 6-14 13-14 5 0 9 2 11 5Z"
      fill="${TEAL}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M18 36 4 40l14 5Z" fill="${TOMATO}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="27" cy="33" r="5.5" fill="#fffdf6" stroke="${INK}" stroke-width="3"/>
    <circle cx="25.5" cy="33.5" r="2.4" fill="${INK}"/>
  </g>`

const chips = [
  [812, 330, 14],
  [796, 372, 40],
  [826, 404, 70],
  [790, 300, 20],
]
  .map(
    ([x, y, rotation]) =>
      `<rect x="${x}" y="${y}" width="15" height="11" rx="3" fill="#d9a05b" stroke="${INK}" stroke-width="3" transform="rotate(${rotation} ${x} ${y})"/>`
  )
  .join("")

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${PAPER}"/>
  ${dots}

  <rect x="${splitX}" y="0" width="${width - splitX}" height="${height}" fill="${SKY}"/>
  <rect x="${splitX - 5}" y="0" width="10" height="${height}" fill="${INK}"/>

  <rect x="838" y="-10" width="86" height="${height + 20}" fill="${BARK}" stroke="${INK}" stroke-width="9"/>
  <ellipse cx="881" cy="150" rx="14" ry="22" fill="#2c1c0c"/>
  <ellipse cx="881" cy="470" rx="14" ry="22" fill="#2c1c0c"/>
  ${chips}
  ${bird}

  <rect x="60" y="76" width="352" height="54" rx="16" fill="${TEAL}" stroke="${INK}" stroke-width="6"/>
  <text x="84" y="113" fill="${INK}" font-family="Verdana, Geneva, sans-serif" font-size="22" font-weight="bold" letter-spacing="3">.NET BACKEND ENGINEER</text>

  <text x="60" y="232" fill="${INK}" font-family="Impact, Haettenschweiler, 'Arial Black', sans-serif" font-size="88">UPAMA</text>
  <text x="60" y="318" fill="${INK}" font-family="Impact, Haettenschweiler, 'Arial Black', sans-serif" font-size="88">CHOWDHURY</text>

  <text x="60" y="374" fill="${TOMATO}" font-family="Impact, Haettenschweiler, 'Arial Black', sans-serif" font-size="30">I PECK AT BACKENDS UNTIL THEY BEHAVE.</text>
  <text x="60" y="424" fill="${INK}" font-family="Verdana, Geneva, sans-serif" font-size="21">ASP.NET Core &#183; .NET 8 &#183; AWS &#183; MongoDB &#183; Dhaka</text>

  <rect x="60" y="486" width="296" height="56" rx="28" fill="${MARIGOLD}" stroke="${INK}" stroke-width="6"/>
  <text x="208" y="523" fill="${INK}" font-family="Verdana, Geneva, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">upamachy.github.io</text>

  <circle cx="${520 + photoSize / 2}" cy="${454 + photoSize / 2}" r="${photoSize / 2 + 5}" fill="${PAPER}" stroke="${INK}" stroke-width="7"/>
</svg>`

await sharp(Buffer.from(svg))
  .composite([{ input: roundPhoto, left: 520, top: 454 }])
  .png()
  .toFile(path.join(publicDir, "og.png"))

console.log("generated icons and og.png")
