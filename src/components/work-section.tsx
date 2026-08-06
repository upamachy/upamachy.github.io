import { FlaskConical } from "lucide-react"
import { Section } from "@/components/section"
import { research, work } from "@/data/profile"
import { cn } from "@/lib/utils"

export function WorkSection() {
  return (
    <Section id="work" tinted>
      <ol className="space-y-10 sm:space-y-14">
        {work.map((job) => (
          <li key={job.id}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="font-heading text-2xl tracking-wide sm:text-3xl">{job.company}</h3>
              {job.current ? (
                <span className="rounded-full border-2 border-ink bg-teal px-3 py-0.5 text-xs font-black text-ink uppercase">
                  Now
                </span>
              ) : null}
            </div>

            <p className="mt-1 text-base font-bold sm:text-lg">{job.role}</p>
            <p className="text-sm font-bold text-muted-foreground">
              {job.period} · {job.location}
            </p>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed font-medium">
              {job.summary}
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {job.projects.map((project) => (
                <article
                  key={project.name}
                  className={cn(
                    "rounded-xl border-4 border-ink bg-card p-5 shadow-[6px_6px_0_0_var(--ink)]",
                    job.projects.length === 1 && "md:col-span-2"
                  )}
                >
                  <h4 className="font-heading text-xl tracking-wide">{project.name}</h4>
                  <p className="mt-0.5 text-xs font-black tracking-[0.14em] text-tomato-deep uppercase">
                    {project.kind}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed font-medium">{project.blurb}</p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed font-medium marker:text-tomato">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="pl-1 text-muted-foreground">
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border-2 border-ink bg-background px-2.5 py-0.5 text-xs font-bold"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-xl border-4 border-ink bg-marigold p-5 text-ink shadow-[6px_6px_0_0_var(--ink)] sm:p-6">
        <p className="flex items-center gap-2 text-xs font-black tracking-[0.16em] uppercase">
          <FlaskConical className="size-4" />
          Research
        </p>
        <h3 className="mt-2 font-heading text-xl tracking-wide text-balance sm:text-2xl">
          {research.title}
        </h3>
        <p className="mt-1 text-sm font-bold">{research.context}</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed font-medium">{research.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {research.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border-2 border-ink bg-background px-2.5 py-0.5 text-xs font-bold text-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
