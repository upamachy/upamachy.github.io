import { Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    value: "linkedin.com/in/upamachowdhury",
    href: profile.linkedin,
    icon: LinkedinIcon,
  },
]

export function ContactSection() {
  return (
    <Section id="contact">
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {channels.map((channel) => (
          <div key={channel.key} className="border-t pt-5">
            <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              <channel.icon className="size-3.5" />
              {channel.label}
            </dt>
            <dd className="mt-2 min-w-0">
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="flex min-h-7 max-w-full items-center truncate text-[0.9375rem] font-medium hover:underline"
              >
                {channel.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-col gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-base font-medium text-balance">{profile.headline}</p>

        <div className="flex w-full flex-wrap gap-2.5 sm:w-auto">
          <Button asChild size="lg" className="h-11 flex-1 px-5 text-base sm:flex-none">
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4.5!" />
              Send an email
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 flex-1 px-5 text-base sm:flex-none"
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
