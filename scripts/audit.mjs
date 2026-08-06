import { createRequire } from "node:module"
import { mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import { chromium, devices } from "playwright"

const require = createRequire(import.meta.url)
const axeSource = await readFile(require.resolve("axe-core"), "utf8")

const baseUrl = process.env.AUDIT_URL ?? "http://localhost:4173/"
const shotDir = process.env.AUDIT_SHOTS ?? path.join(process.cwd(), ".audit")
await mkdir(shotDir, { recursive: true })

const viewports = [
  { name: "mobile-360", width: 360, height: 740, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "mobile-414", width: 414, height: 896, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "laptop-1024", width: 1024, height: 768, mobile: false },
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "wide-1920", width: 1920, height: 1080, mobile: false },
]

const problems = []
const fail = (scope, message) => problems.push(`[${scope}] ${message}`)

const browser = await chromium.launch()

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 2,
    isMobile: viewport.mobile,
    hasTouch: viewport.mobile,
    userAgent: viewport.mobile ? devices["iPhone 13"].userAgent : undefined,
  })
  const page = await context.newPage()

  const consoleErrors = []
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      consoleErrors.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on("pageerror", (error) => consoleErrors.push(`pageerror: ${error.message}`))

  const failedRequests = []
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.url()} ${request.failure()?.errorText ?? ""}`)
  })
  page.on("response", (response) => {
    if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`)
  })

  await page.goto(baseUrl, { waitUntil: "networkidle" })
  await page.waitForTimeout(600)

  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth
    const offenders = []
    for (const element of document.querySelectorAll("body *")) {
      const rect = element.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.right > docWidth + 1 || rect.left < -1) {
        const style = getComputedStyle(element)
        if (style.position === "fixed") continue
        offenders.push({
          tag: element.tagName.toLowerCase(),
          cls: (element.className || "").toString().slice(0, 90),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        })
      }
    }
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: docWidth,
      offenders: offenders.slice(0, 6),
    }
  })

  if (overflow.scrollWidth > overflow.clientWidth + 1) {
    fail(
      viewport.name,
      `horizontal overflow ${overflow.scrollWidth} > ${overflow.clientWidth}: ${JSON.stringify(overflow.offenders)}`
    )
  }

  const canvasCount = await page.locator("canvas").count()
  if (canvasCount < 1) fail(viewport.name, "three.js canvas not rendered")

  const h1 = await page.locator("h1").first().textContent()
  if (!h1?.includes("Upama")) fail(viewport.name, `unexpected h1: ${h1}`)
  if ((await page.locator("h1").count()) !== 1) fail(viewport.name, "expected exactly one h1")

  const avatarLoaded = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"))
    return images.length > 0 && images.every((image) => image.complete && image.naturalWidth > 0)
  })
  if (!avatarLoaded) fail(viewport.name, "an image failed to load")

  const tapTargets = await page.evaluate(() => {
    const small = []
    for (const element of document.querySelectorAll("a, button")) {
      const rect = element.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (element.closest(".sr-only") || element.classList.contains("sr-only")) continue
      if (rect.height < 24 || rect.width < 24) {
        small.push(`${element.tagName.toLowerCase()}:${Math.round(rect.width)}x${Math.round(rect.height)}:${(element.textContent || "").trim().slice(0, 24)}`)
      }
    }
    return small.slice(0, 8)
  })
  if (viewport.mobile && tapTargets.length > 0) {
    fail(viewport.name, `tap targets under 24px: ${tapTargets.join(", ")}`)
  }

  await page.screenshot({
    path: path.join(shotDir, `${viewport.name}-top.png`),
    fullPage: false,
  })

  const focusable = await page.evaluate(
    () =>
      Array.from(
        document.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((element) => element.getBoundingClientRect().height > 0).length
  )
  if (focusable < 10) fail(viewport.name, `only ${focusable} focusable elements`)

  await page.keyboard.press("Tab")
  const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? "")
  if (!firstFocus.includes("Skip to content")) {
    fail(viewport.name, `first tab stop is not the skip link: "${firstFocus}"`)
  }
  await page.keyboard.press("Enter")
  await page.waitForTimeout(200)

  const SECTIONS = ["about", "work", "toolbox", "schooling", "contact"]

  for (const id of SECTIONS) {
    const section = page.locator(`section#${id}`)
    if ((await section.count()) !== 1) {
      fail(viewport.name, `section #${id} missing`)
      continue
    }
    const heading = await section.locator("h2").first().textContent()
    if (!heading?.trim()) fail(viewport.name, `section #${id} has no h2`)

    await page.evaluate((target) => {
      document.getElementById(target)?.scrollIntoView()
    }, id)
    await page.waitForTimeout(200)

    const covered = await page.evaluate((target) => {
      const element = document.getElementById(target)
      if (!element) return "missing"
      const heading = element.querySelector("h2")
      if (!heading) return "no-heading"
      const rect = heading.getBoundingClientRect()
      const header = document.querySelector("header.sticky")
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0
      return rect.top >= headerBottom - 1 ? "ok" : `covered by header (${Math.round(rect.top)} < ${Math.round(headerBottom)})`
    }, id)
    if (covered !== "ok") fail(viewport.name, `#${id} anchor: ${covered}`)
  }

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  const schoolingText = (await page.locator('section#schooling').innerText()).toLowerCase()
  for (const expected of [
    'higher secondary',
    'secondary school certificate',
    '4.17',
    '5.00',
    'edu computer club',
    'anthropic',
  ]) {
    if (!schoolingText.includes(expected)) {
      fail(viewport.name, 'schooling section missing ' + expected)
    }
  }

  await page.evaluate(() => document.getElementById('work')?.scrollIntoView())
  await page.waitForTimeout(450)
  if (viewport.width >= 1024) {
    const current = await page.locator('header nav a[aria-current="true"]').first().textContent()
    if (current?.trim() !== 'Work') {
      fail(viewport.name, 'scroll spy showed ' + current?.trim() + ' instead of Work')
    }
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  if (viewport.width < 1024) {
    const menu = page.getByRole("button", { name: "Open menu" })
    if ((await menu.count()) === 0) {
      fail(viewport.name, "mobile menu button missing")
    } else {
      await menu.first().click()
      await page.waitForTimeout(400)
      const dialogVisible = await page.locator("[role=dialog]").first().isVisible()
      if (!dialogVisible) fail(viewport.name, "mobile menu sheet did not open")
      await page.screenshot({ path: path.join(shotDir, `${viewport.name}-menu.png`) })
      await page.keyboard.press("Escape")
      await page.waitForTimeout(350)
      if (await page.locator("[role=dialog]").first().isVisible().catch(() => false)) {
        fail(viewport.name, "mobile menu sheet did not close on Escape")
      }
    }
  } else {
    const headerNav = page.locator("header nav[aria-label='Sections']")
    if (!(await headerNav.first().isVisible())) fail(viewport.name, "desktop section nav hidden")
  }

  const themeButtons = page.getByRole("button", { name: "Toggle theme" })
  if ((await themeButtons.count()) === 0) {
    fail(viewport.name, "theme toggle missing")
  } else {
    const before = await page.evaluate(() => document.documentElement.classList.contains("dark"))
    await themeButtons.first().click()
    await page.waitForTimeout(300)
    const after = await page.evaluate(() => document.documentElement.classList.contains("dark"))
    if (before === after) fail(viewport.name, "theme toggle did not change theme")
    await page.screenshot({ path: path.join(shotDir, `${viewport.name}-alt-theme.png`) })
    await themeButtons.first().click()
    await page.waitForTimeout(250)
  }

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.addScriptTag({ content: axeSource })
  const axeResults = await page.evaluate(async () => {
    const results = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
    })
    return results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
      target: violation.nodes[0]?.target?.join(" ") ?? "",
    }))
  })
  const blocking = axeResults.filter((violation) =>
    ["critical", "serious", "moderate"].includes(violation.impact)
  )
  if (blocking.length > 0) fail(viewport.name, `axe: ${JSON.stringify(blocking)}`)

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(shotDir, `${viewport.name}-bottom.png`) })

  const noisy = consoleErrors.filter(
    (entry) =>
      !entry.includes("Download the React DevTools") &&
      !entry.includes("favicon") &&
      !entry.includes("GL Driver Message")
  )
  if (noisy.length > 0) fail(viewport.name, `console: ${noisy.slice(0, 5).join(" | ")}`)
  if (failedRequests.length > 0) fail(viewport.name, `requests: ${failedRequests.slice(0, 5).join(" | ")}`)

  await context.close()
}

const seoContext = await browser.newContext({ javaScriptEnabled: false })
const seoPage = await seoContext.newPage()
await seoPage.goto(baseUrl, { waitUntil: "domcontentloaded" })
const seo = await seoPage.evaluate(() => {
  const meta = (selector) => document.querySelector(selector)?.getAttribute("content") ?? null
  const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
    (node) => node.textContent
  )
  return {
    title: document.title,
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    ogImage: meta('meta[property="og:image"]'),
    twitterCard: meta('meta[name="twitter:card"]'),
    robots: meta('meta[name="robots"]'),
    manifest: document.querySelector('link[rel="manifest"]')?.getAttribute("href") ?? null,
    h1Count: document.querySelectorAll("h1").length,
    sectionCount: document.querySelectorAll("section[id]").length,
    textLength: (document.body.innerText || document.body.textContent || "").length,
    jsonLd,
    lang: document.documentElement.lang,
  }
})

if (!seo.title?.includes("Upama")) fail("seo", `bad title: ${seo.title}`)
if (!seo.description) fail("seo", "missing description")
if (!seo.canonical) fail("seo", "missing canonical")
if (!seo.ogImage) fail("seo", "missing og:image")
if (!seo.twitterCard) fail("seo", "missing twitter:card")
if (!seo.robots) fail("seo", "missing robots")
if (!seo.manifest) fail("seo", "missing manifest")
if (seo.lang !== "en") fail("seo", `bad lang: ${seo.lang}`)
if (seo.sectionCount < 6) fail("seo", `prerendered sections: ${seo.sectionCount}`)
if (seo.textLength < 5000) fail("seo", `prerendered text too short: ${seo.textLength}`)
if (seo.jsonLd.length !== 1) fail("seo", `json-ld blocks: ${seo.jsonLd.length}`)
else {
  try {
    const parsed = JSON.parse(seo.jsonLd[0])
    const types = parsed["@graph"].map((node) => node["@type"])
    for (const expected of ["Person", "WebSite", "ProfilePage", "BreadcrumbList"]) {
      if (!types.includes(expected)) fail("seo", `json-ld missing ${expected}`)
    }
  } catch (error) {
    fail("seo", `json-ld parse error: ${error.message}`)
  }
}

for (const asset of ["robots.txt", "sitemap.xml", "site.webmanifest", "og.png", "favicon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "Upama-Chowdhury-CV.pdf", "upama.jpg", "cert-pencilbox.jpg"]) {
  const response = await seoPage.request.get(new URL(asset, baseUrl).href)
  if (!response.ok()) fail("assets", `${asset} -> ${response.status()}`)
}

await seoContext.close()
await browser.close()

console.log(JSON.stringify({ seo: { ...seo, jsonLd: `${seo.jsonLd[0]?.length ?? 0} chars` } }, null, 2))

if (problems.length > 0) {
  console.error(`\n${problems.length} PROBLEM(S):`)
  for (const problem of problems) console.error(` - ${problem}`)
  process.exit(1)
}

console.log("\nAll checks passed.")
