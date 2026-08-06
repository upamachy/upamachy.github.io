import { Award, MapPin, School, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { activities, education } from "@/data/profile"

export function EducationSection() {
  return (
    <Section id="education" count={education.length}>
      <ol className="relative space-y-5 border-l border-dashed pl-6 sm:pl-9">
        {education.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden
              className="absolute top-6 -left-[1.8125rem] grid size-6 place-items-center rounded-full border-2 border-background bg-rose-500/15 ring-1 ring-rose-500/30 sm:-left-[2.5625rem]"
            >
              <span className="size-2 rounded-full bg-rose-500" />
            </span>

            <Card className="gap-4 rounded-2xl">
              <CardHeader className="gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300"
                  >
                    {item.period}
                  </Badge>
                  <Badge variant="outline" className="rounded-full">
                    <Award className="size-3!" />
                    {item.grade}
                  </Badge>
                </div>

                <CardTitle className="mt-1 text-lg font-semibold text-balance">
                  {item.degree}
                </CardTitle>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <School className="size-4" />
                    {item.institution}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {item.location}
                  </span>
                </div>
              </CardHeader>

              {item.notes.length > 0 ? (
                <CardContent>
                  <ul className="space-y-2">
                    {item.notes.map((note) => (
                      <li key={note} className="flex gap-2.5 text-sm leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-500/70"
                        />
                        <span className="text-muted-foreground">{note}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              ) : null}
            </Card>
          </li>
        ))}
      </ol>

      <div className="mt-10 sm:mt-12">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Users className="size-4.5 text-rose-700 dark:text-rose-300" />
          Co-curricular activities
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {activities.map((activity) => (
            <Card key={activity.id} className="gap-2 rounded-2xl">
              <CardHeader className="gap-1">
                <CardTitle className="text-base font-semibold">{activity.role}</CardTitle>
                <p className="text-sm font-medium text-muted-foreground">{activity.organization}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{activity.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
