import { Cloud, Database, ServerCog, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/section"
import { about } from "@/data/profile"

const pillars = [
  {
    icon: ServerCog,
    title: "Service design",
    body: "Clean Architecture, microservices and background jobs on .NET 6 and .NET 8.",
  },
  {
    icon: Cloud,
    title: "Event-driven on AWS",
    body: "Lambda, Step Functions, EventBridge and SQS instead of brittle synchronous calls.",
  },
  {
    icon: Database,
    title: "Data that holds",
    body: "MongoDB and SQL Server, with EF Core query work when reports get slow.",
  },
  {
    icon: ShieldCheck,
    title: "Correctness under load",
    body: "Permission-based JWT auth, duplicate blocking, and exports that survive bad rows.",
  },
]

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-4 lg:col-span-3">
          {about.map((paragraph) => (
            <p key={paragraph} className="text-[0.9375rem] leading-relaxed sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="gap-0 rounded-2xl py-4">
              <CardContent className="flex gap-3 px-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400">
                  <pillar.icon className="size-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{pillar.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pillar.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
