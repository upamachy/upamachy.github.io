import { Download, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { PeckStage } from "@/components/peck-stage"
import { profile, stats, topSkills } from "@/data/profile"
import { asset } from "@/lib/asset"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(color-mix(in_oklch,var(--ink)_20%,transparent)_1px,transparent_1px)] bg-[size:18px_18px]"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <p className="inline-block -rotate-2 rounded-lg border-2 border-ink bg-teal px-3 py-1 text-xs font-black tracking-[0.16em] text-ink uppercase shadow-[3px_3px_0_0_var(--ink)]">
              {profile.role}
            </p>

            <h1 className="mt-5 font-heading text-[2.75rem] leading-[0.95] tracking-wide text-balance sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>

            <p className="mt-4 font-heading text-xl tracking-wide text-tomato-deep sm:text-2xl">
              {profile.punchline}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed font-medium sm:text-lg">
              {profile.tagline}
            </p>

            <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1 text-sm font-bold">
              <MapPin className="size-3.5" />
              {profile.location}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 flex-1 border-2 border-ink bg-tomato px-5 text-base font-bold text-ink shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:bg-tomato active:translate-x-1 active:translate-y-1 active:shadow-none sm:flex-none"
                >
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-5!" />
                    Say hello
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 flex-1 border-2 border-ink bg-card px-5 text-base font-bold shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none sm:flex-none"
                >
                  <a href={asset(profile.cv)} download>
                    <Download className="size-5!" />
                    Résumé
                  </a>
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="icon-lg"
                  className="size-12 border-2 border-ink bg-card shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  title="GitHub"
                >
                  <a href={profile.github} target="_blank" rel="noreferrer noopener">
                    <GithubIcon className="size-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon-lg"
                  className="size-12 border-2 border-ink bg-card shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  title="LinkedIn"
                >
                  <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                    <LinkedinIcon className="size-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <PeckStage />
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-3 sm:mt-14 sm:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border-4 border-ink bg-card px-3 py-4 text-center shadow-[5px_5px_0_0_var(--ink)] sm:px-5"
            >
              <dd className="font-heading text-3xl tracking-wide sm:text-5xl">
                {stat.value}
                <span className="text-tomato">{stat.unit}</span>
              </dd>
              <dt className="mt-1 text-xs font-bold text-muted-foreground sm:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <ul className="mt-8 flex flex-wrap items-center gap-2">
          {topSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-bold"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
