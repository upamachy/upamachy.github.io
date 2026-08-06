import { Section } from "@/components/section"
import { experience } from "@/data/profile"

export function ExperienceSection() {
  return (
    <Section id="experience" tinted>
      <ol className="space-y-10 sm:space-y-12">
        {experience.map((job) => (
          <li
            key={job.id}
            className="grid gap-x-10 gap-y-4 border-t pt-8 sm:grid-cols-[10.5rem_1fr]"
          >
            <div className="sm:pt-0.5">
              <p className="text-sm font-medium">{job.period}</p>
              <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
              {job.current ? (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span aria-hidden className="size-1.5 rounded-full bg-emerald-600" />
                  Current role
                </p>
              ) : null}
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{job.role}</h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-blue-700 dark:text-blue-400">
                {job.company}
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed marker:text-muted-foreground/50">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="pl-1 text-foreground/90">
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
