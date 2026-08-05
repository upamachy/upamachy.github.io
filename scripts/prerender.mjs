import { readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const serverDir = path.join(distDir, "server")
const templatePath = path.join(distDir, "index.html")

const { render } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href)
const { html, jsonLd } = render()

const template = await readFile(templatePath, "utf8")

if (!template.includes("<!--app-html-->") || !template.includes("<!--seo-jsonld-->")) {
  throw new Error("prerender placeholders missing from dist/index.html")
}

const output = template
  .replace("<!--app-html-->", html)
  .replace(
    "<!--seo-jsonld-->",
    `<script type="application/ld+json">${jsonLd.replace(/</g, "\\u003c")}</script>`
  )

await writeFile(templatePath, output, "utf8")
await writeFile(path.join(distDir, ".nojekyll"), "", "utf8")
await rm(serverDir, { recursive: true, force: true })

console.log(`prerendered ${html.length} chars of markup into dist/index.html`)
