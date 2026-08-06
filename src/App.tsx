import { useMemo } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AboutSection } from "@/components/about-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { EducationSection } from "@/components/education-section"
import { ExperienceSection } from "@/components/experience-section"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SkillsSection } from "@/components/skills-section"
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader active={active} />

      <main>
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
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
