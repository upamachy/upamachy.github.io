import { Download, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Section } from "@/components/section"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"

const channels = [
  { key: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  {
    key: "phone",
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    key: "github",
    label: "GitHub",
    value: `github.com/${profile.handle}`,
    href: profile.github,
    icon: GithubIcon,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "in/upamachowdhury",
    href: profile.linkedin,
    icon: LinkedinIcon,
  },
]

export function ContactSection() {
  return (
    <Section id="contact">
      <div className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          <Card key={channel.key} className="gap-0 rounded-2xl py-0 transition-colors hover:bg-muted/50">
            <CardContent className="p-0">
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="flex items-center gap-3 px-4 py-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <channel.icon className="size-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">{channel.label}</span>
                  <span className="block truncate text-[0.9375rem] font-medium">{channel.value}</span>
                </span>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-base font-semibold">{profile.headline}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            Based in {profile.location}
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          <Button asChild size="lg" className="h-11 flex-1 rounded-full px-5 text-base sm:flex-none">
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4.5!" />
              Send an email
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 flex-1 rounded-full px-5 text-base sm:flex-none"
          >
            <a href={asset(profile.cv)} download>
              <Download className="size-4.5!" />
              Résumé
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
