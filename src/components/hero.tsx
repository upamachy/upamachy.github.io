import { ArrowDown, Download, Mail, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { ThreeBanner } from "@/components/three-banner"
import { profile, stats, topSkills } from "@/data/profile"
import { asset } from "@/lib/asset"

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b">
      <ThreeBanner className="absolute inset-0 -z-20 opacity-70" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/40 via-background/75 to-background" />

      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:gap-10">
          <Avatar className="size-28 shrink-0 border-4 border-background shadow-lg sm:size-36 md:mt-1">
            <AvatarImage src={asset(profile.avatar)} alt={profile.name} />
            <AvatarFallback className="text-3xl">UC</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <Badge variant="outline" className="rounded-full bg-background/70 py-1">
              <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
              {profile.availability}
            </Badge>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {profile.name}
            </h1>

            <p className="mt-2 text-lg font-medium text-muted-foreground sm:text-xl">
              {profile.role}
            </p>

            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base">
              {profile.tagline}
            </p>

            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {profile.location}
            </p>

            <div className="mt-6 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <div className="flex gap-2.5">
                <Button asChild size="lg" className="h-11 flex-1 rounded-full px-5 text-base sm:flex-none">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4.5!" />
                    Hire me
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

              <div className="flex gap-2.5">
                <Button
                  asChild
                  variant="outline"
                  size="icon-lg"
                  className="size-11 rounded-full"
                  title="GitHub"
                >
                  <a href={profile.github} target="_blank" rel="noreferrer noopener">
                    <GithubIcon className="size-4.5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon-lg"
                  className="size-11 rounded-full"
                  title="LinkedIn"
                >
                  <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                    <LinkedinIcon className="size-4.5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-card/70 px-4 py-3.5 backdrop-blur-sm"
            >
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-0.5 text-2xl font-bold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-1.5">
          {topSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-full bg-secondary/80">
              {skill}
            </Badge>
          ))}
        </div>

        <Button asChild variant="ghost" size="sm" className="mt-8 h-9 rounded-full px-3">
          <a href="#about">
            <ArrowDown className="size-4!" />
            Browse the work
          </a>
        </Button>
      </div>
    </section>
  )
}
