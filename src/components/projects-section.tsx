import { ExternalLink, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { projects } from "@/data/profile"
import { asset } from "@/lib/asset"

export function ProjectsSection() {
  return (
    <Section id="projects" count={projects.length}>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="gap-4 rounded-2xl transition-shadow hover:shadow-md last:md:col-span-2"
          >
            <CardHeader className="gap-1">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                  <Package className="size-5" />
                </span>
                <Badge variant="outline" className="rounded-full text-muted-foreground">
                  {project.period}
                </Badge>
              </div>

              <CardTitle className="mt-3 text-lg font-semibold">{project.name}</CardTitle>
              <CardDescription className="font-medium">
                {project.kind} · {project.org}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-[0.9375rem] leading-relaxed text-foreground/90">{project.blurb}</p>

              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500/70"
                    />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              {project.href ? (
                <Button asChild variant="outline" size="sm" className="rounded-full">
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
