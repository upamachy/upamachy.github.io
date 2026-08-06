import { Cloud, Database, ServerCog, ShieldCheck } from "lucide-react"
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
    title: "Event-driven architecture",
    body: "AWS Lambda, Step Functions, EventBridge and SQS for asynchronous processing.",
  },
  {
    icon: Database,
    title: "Data layer",
    body: "MongoDB and SQL Server, with EF Core and LINQ query optimization.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    body: "Permission-based JWT authorization, duplicate-submission control and fault-tolerant exports.",
  },
]

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="space-y-4 lg:col-span-3">
          {about.map((paragraph) => (
            <p key={paragraph} className="text-[0.9375rem] leading-relaxed sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:gap-y-5">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="flex gap-3">
              <pillar.icon className="mt-0.5 size-5 shrink-0 text-blue-700 dark:text-blue-400" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{pillar.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
