import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { certifications } from "@/data/profile"
import { asset } from "@/lib/asset"

export function CertificationsSection() {
  return (
    <Section id="certifications" tinted>
      <ol className="space-y-8">
        {certifications.map((certification) => (
          <li
            key={certification.id}
            className="grid gap-x-10 gap-y-3 border-t pt-7 sm:grid-cols-[10.5rem_1fr]"
          >
            <p className="text-sm font-medium sm:pt-0.5">{certification.date}</p>

            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-balance sm:text-lg">
                {certification.title}
              </h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-blue-700 dark:text-blue-400">
                {certification.issuer}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {certification.detail}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                {certification.credential ? (
                  <p className="rounded-md border bg-background px-2 py-1 font-mono text-xs text-muted-foreground">
                    ID {certification.credential}
                  </p>
                ) : null}

                {certification.href ? (
                  <Button asChild variant="outline" size="sm">
                    <a href={asset(certification.href)} target="_blank" rel="noreferrer noopener">
                      <ExternalLink />
                      {certification.hrefLabel ?? "Open"}
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
