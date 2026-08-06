import { BadgeCheck, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { certifications } from "@/data/profile"
import { asset } from "@/lib/asset"

export function CertificationsSection() {
  return (
    <Section id="certifications" tinted count={certifications.length}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification) => (
          <Card key={certification.id} className="gap-4 rounded-2xl">
            <CardHeader className="gap-1">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 ring-1 ring-cyan-500/20 dark:text-cyan-400">
                  <BadgeCheck className="size-5" />
                </span>
                <Badge variant="outline" className="rounded-full text-muted-foreground">
                  {certification.date}
                </Badge>
              </div>

              <CardTitle className="mt-3 text-base font-semibold text-balance">
                {certification.title}
              </CardTitle>
              <CardDescription className="font-medium">{certification.issuer}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{certification.detail}</p>

              {certification.credential ? (
                <p className="font-mono text-xs text-muted-foreground">
                  ID {certification.credential}
                </p>
              ) : null}

              {certification.href ? (
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <a href={asset(certification.href)} target="_blank" rel="noreferrer noopener">
                    <ExternalLink />
                    {certification.hrefLabel ?? "Open"}
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
