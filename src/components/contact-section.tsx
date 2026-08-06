import { Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Section } from "@/components/section"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"

const channels = [
  {
    key: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    tint: "bg-marigold",
  },
  {
    key: "phone",
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
    tint: "bg-teal",
  },
  {
    key: "github",
    label: "GitHub",
    value: `github.com/${profile.handle}`,
    href: profile.github,
    icon: GithubIcon,
    tint: "bg-tomato",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "in/upamachowdhury",
    href: profile.linkedin,
    icon: LinkedinIcon,
    tint: "bg-sky",
  },
]

export function ContactSection() {
  return (
    <Section id="contact">
      <ul className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          <li key={channel.key}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="flex items-center gap-4 rounded-xl border-4 border-ink bg-card p-4 shadow-[6px_6px_0_0_var(--ink)] transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-lg border-2 border-ink text-ink ${channel.tint}`}
              >
                <channel.icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black tracking-[0.14em] text-muted-foreground uppercase">
                  {channel.label}
                </span>
                <span className="block truncate text-[0.9375rem] font-bold">{channel.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-start gap-5 rounded-2xl border-4 border-ink bg-card p-6 shadow-[8px_8px_0_0_var(--ink)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-2xl tracking-wide text-balance sm:text-3xl">
            That's all, folks.
          </p>
          <p className="mt-1.5 text-sm font-bold text-muted-foreground">
            Questions, a stubborn bug, or just hello — my inbox is open.
          </p>
        </div>

        <div className="flex w-full flex-wrap gap-3 sm:w-auto">
          <Button
            asChild
            size="lg"
            className="h-12 flex-1 border-2 border-ink bg-tomato px-5 text-base font-bold text-ink shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:bg-tomato active:translate-x-1 active:translate-y-1 active:shadow-none sm:flex-none"
          >
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-5!" />
              Email me
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 flex-1 border-2 border-ink bg-background px-5 text-base font-bold shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none sm:flex-none"
          >
            <a href={asset(profile.cv)} download>
              <Download className="size-5!" />
              Résumé
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
