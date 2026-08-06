import { useMemo } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Hero } from "@/components/hero"
import { SchoolingSection } from "@/components/schooling-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ToolboxSection } from "@/components/toolbox-section"
import { WorkSection } from "@/components/work-section"
import { sectionList } from "@/components/nav"
import { ThemeProvider } from "@/components/theme-provider"
import { useScrollSpy } from "@/lib/use-scroll-spy"

function Shell() {
  const ids = useMemo(() => sectionList.map((section) => section.id), [])
  const active = useScrollSpy(ids)

  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:border-2 focus:border-ink focus:bg-marigold focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>

      <SiteHeader active={active} />

      <main>
        <Hero />
        <AboutSection />
        <WorkSection />
        <ToolboxSection />
        <SchoolingSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Shell />
      </TooltipProvider>
    </ThemeProvider>
  )
}
