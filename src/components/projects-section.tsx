import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { projects } from "@/data/profile"
import { asset } from "@/lib/asset"

export function ProjectsSection() {
  return (
    <Section id="projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="gap-5 rounded-lg last:md:col-span-2">
            <CardHeader className="gap-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  {project.name}
                </CardTitle>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {project.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.kind} · {project.org}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-[0.9375rem] leading-relaxed text-foreground/90">{project.blurb}</p>

              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-muted-foreground/50">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="pl-1 text-muted-foreground">
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border bg-muted/50 px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {project.href ? (
                <Button asChild variant="outline" size="sm">
                  <a href={asset(project.href)} target="_blank" rel="noreferrer noopener">
                    <ExternalLink />
                    {project.hrefLabel ?? "Open"}
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
