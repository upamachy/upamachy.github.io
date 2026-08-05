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

const photo = await sharp(path.join(publicDir, "upama.jpg")).resize(360, 360, { fit: "cover" }).png().toBuffer()

const mask = Buffer.from(
  `<svg width="360" height="360"><circle cx="180" cy="180" r="180" fill="#fff"/></svg>`
)
const roundPhoto = await sharp(photo)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer()

const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="55%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#141428"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.28" r="0.6">
      <stop offset="0%" stop-color="#8ab4ff" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#8ab4ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <g stroke="#8ab4ff" stroke-opacity="0.13" stroke-width="1">
    ${Array.from({ length: 15 }, (_, index) => `<line x1="0" y1="${index * 45}" x2="${width}" y2="${index * 45}"/>`).join("")}
    ${Array.from({ length: 27 }, (_, index) => `<line x1="${index * 45}" y1="0" x2="${index * 45}" y2="${height}"/>`).join("")}
  </g>
  <text x="80" y="180" fill="#8ab4ff" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="4">${escape("UPAMA'S CODING HOUSE")}</text>
  <text x="80" y="272" fill="#fafafa" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="72" font-weight="700">Upama Chowdhury</text>
  <text x="80" y="336" fill="#c9d3e6" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="38" font-weight="500">.NET Backend Engineer</text>
  <text x="80" y="404" fill="#8e9ab3" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="27">ASP.NET Core &#183; .NET 8 &#183; AWS Serverless &#183; MongoDB</text>
  <text x="80" y="446" fill="#8e9ab3" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="27">Dhaka, Bangladesh</text>
  <rect x="80" y="500" width="264" height="56" rx="28" fill="#8ab4ff" fill-opacity="0.14" stroke="#8ab4ff" stroke-opacity="0.4"/>
  <text x="212" y="536" fill="#cfe0ff" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle">upamachy.github.io</text>
  <circle cx="920" cy="315" r="196" fill="none" stroke="#8ab4ff" stroke-opacity="0.35" stroke-width="2"/>
  <circle cx="920" cy="315" r="232" fill="none" stroke="#8ab4ff" stroke-opacity="0.16" stroke-width="2"/>
</svg>
`)

await sharp(background)
  .composite([{ input: roundPhoto, left: 740, top: 135 }])
  .png()
  .toFile(path.join(publicDir, "og.png"))

console.log("generated icons and og.png")
