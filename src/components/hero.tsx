import { Download, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { ThreeBanner } from "@/components/three-banner"
import { profile, stats, topSkills } from "@/data/profile"
import { asset } from "@/lib/asset"

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b">
      <ThreeBanner className="absolute inset-0 -z-20 opacity-45" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/60 via-background/85 to-background" />

      <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase dark:text-blue-400">
              {profile.role}
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.tagline}
            </p>

            <dl className="mt-7 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <dt className="sr-only">Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <dt className="sr-only">Email</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex min-h-6 max-w-full items-center truncate hover:underline"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="inline-flex min-h-6 items-center hover:underline"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-2.5">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-emerald-600" />
                <dt className="sr-only">Availability</dt>
                <dd className="text-muted-foreground">{profile.availability}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="flex gap-2.5">
                <Button asChild size="lg" className="h-11 flex-1 px-5 text-base sm:flex-none">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4.5!" />
                    Get in touch
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

              <div className="flex gap-2.5">
                <Button asChild variant="outline" size="icon-lg" className="size-11" title="GitHub">
                  <a href={profile.github} target="_blank" rel="noreferrer noopener">
                    <GithubIcon className="size-4.5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon-lg" className="size-11" title="LinkedIn">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                    <LinkedinIcon className="size-4.5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <figure className="order-first w-40 shrink-0 md:order-last md:w-56">
            <img
              src={asset(profile.avatar)}
              alt={`Portrait of ${profile.name}`}
              width={224}
              height={280}
              className="aspect-4/5 w-full rounded-lg border bg-muted object-cover object-top shadow-sm"
            />
          </figure>
        </div>

        <Separator className="mt-12" />

        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 pt-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</dd>
              <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
          <span className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Core stack
          </span>
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border bg-background/70 px-2 py-1 text-xs text-foreground/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
