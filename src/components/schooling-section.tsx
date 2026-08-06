import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { certifications, education } from "@/data/profile"
import { asset } from "@/lib/asset"

export function SchoolingSection() {
  return (
    <Section id="schooling" tinted>
      <ol className="grid gap-5 lg:grid-cols-3">
        {education.map((item) => (
          <li
            key={item.id}
            className="flex flex-col rounded-xl border-4 border-ink bg-card p-5 shadow-[6px_6px_0_0_var(--ink)]"
          >
            <span className="inline-block w-fit rounded-full border-2 border-ink bg-sky px-3 py-0.5 text-xs font-black text-ink">
              {item.period}
            </span>

            <h3 className="mt-3 font-heading text-lg leading-tight tracking-wide text-balance">
              {item.degree}
            </h3>
            <p className="mt-1.5 text-sm font-bold">{item.institution}</p>
            <p className="text-sm font-medium text-muted-foreground">{item.location}</p>

            <p className="mt-3 w-fit rounded-lg border-2 border-ink bg-marigold px-2.5 py-1 text-xs font-black text-ink">
              {item.grade}
            </p>

            {item.note ? (
              <p className="mt-3 text-sm font-medium text-muted-foreground">{item.note}</p>
            ) : null}
          </li>
        ))}
      </ol>

      <h3 className="mt-12 font-heading text-xl tracking-wide sm:text-2xl">Badges collected</h3>

      <ol className="mt-5 grid gap-5 sm:grid-cols-3">
        {certifications.map((certification) => (
          <li
            key={certification.id}
            className="flex flex-col rounded-xl border-4 border-ink bg-card p-5 shadow-[6px_6px_0_0_var(--ink)]"
          >
            <span className="inline-block w-fit rounded-full border-2 border-ink bg-tomato px-3 py-0.5 text-xs font-black text-ink">
              {certification.date}
            </span>

            <h4 className="mt-3 font-heading text-base leading-tight tracking-wide text-balance">
              {certification.title}
            </h4>
            <p className="mt-1.5 text-sm font-bold">{certification.issuer}</p>

            {certification.credential ? (
              <p className="mt-2 font-mono text-xs font-medium break-all text-muted-foreground">
                ID {certification.credential}
              </p>
            ) : null}

            {certification.href ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 w-fit border-2 border-ink font-bold shadow-[3px_3px_0_0_var(--ink)]"
              >
                <a href={asset(certification.href)} target="_blank" rel="noreferrer noopener">
                  <ExternalLink />
                  {certification.hrefLabel ?? "Open"}
                </a>
              </Button>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
