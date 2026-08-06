import { Building2, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { experience } from "@/data/profile"

export function ExperienceSection() {
  return (
    <Section id="experience" tinted count={experience.length}>
      <ol className="relative space-y-5 border-l border-dashed pl-6 sm:space-y-6 sm:pl-9">
        {experience.map((job) => (
          <li key={job.id} className="relative">
            <span
              aria-hidden
              className="absolute top-6 -left-[1.8125rem] grid size-6 place-items-center rounded-full border-2 border-background bg-violet-500/15 ring-1 ring-violet-500/30 sm:-left-[2.5625rem]"
            >
              <span className="size-2 rounded-full bg-violet-500" />
            </span>

            <Card className="gap-4 rounded-2xl">
              <CardHeader className="gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300"
                  >
                    {job.period}
                  </Badge>
                  {job.current ? (
                    <Badge variant="outline" className="rounded-full text-muted-foreground">
                      Current
                    </Badge>
                  ) : null}
                </div>
                <CardTitle className="mt-1 text-lg font-semibold sm:text-xl">{job.role}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Building2 className="size-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {job.location}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-[0.9375rem] leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500/70"
                      />
                      <span className="text-foreground/90">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  )
}
