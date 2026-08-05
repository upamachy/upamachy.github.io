import { BadgeCheck, CalendarDays, Download, Mail, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { ThreeBanner } from "@/components/three-banner"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"

export function ProfileHero() {
  return (
    <header>
      <div className="relative h-40 overflow-hidden bg-linear-to-br from-sky-100 via-slate-100 to-background sm:h-52 dark:from-sky-950 dark:via-slate-900 dark:to-background">
        <ThreeBanner className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="px-4 pb-4 sm:px-5">
        <div className="flex items-end justify-between gap-3">
          <Avatar className="-mt-12 size-24 border-4 border-background shadow-sm sm:-mt-16 sm:size-32">
            <AvatarImage src={asset(profile.avatar)} alt={profile.name} />
            <AvatarFallback className="text-2xl">UC</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-1.5 pb-1">
            <Button asChild variant="outline" size="icon-lg" className="rounded-full" title="GitHub">
              <a href={profile.github} target="_blank" rel="noreferrer noopener">
                <GithubIcon className="size-4.5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="icon-lg" className="rounded-full" title="LinkedIn">
              <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                <LinkedinIcon className="size-4.5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button asChild size="lg" className="h-9 rounded-full px-4">
              <a href={`mailto:${profile.email}`}>
                <Mail className="size-4!" />
                Hire me
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <h1 className="flex items-center gap-1.5 text-xl font-bold tracking-tight sm:text-2xl">
            {profile.name}
            <BadgeCheck className="size-5 shrink-0 text-primary" aria-label="Verified" />
          </h1>
          <p className="text-sm text-muted-foreground">@{profile.handle}</p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Badge className="rounded-full">{profile.role}</Badge>
          <Badge variant="outline" className="rounded-full text-muted-foreground">
            Open to opportunities
          </Badge>
        </div>

        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-foreground/90">
          {profile.tagline}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex min-h-6 items-center gap-1.5">
            <MapPin className="size-4" />
            {profile.location}
          </span>
          <span className="flex min-h-6 items-center gap-1.5">
            <CalendarDays className="size-4" />
            {profile.joined}
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="flex min-h-6 items-center gap-1.5 text-primary hover:underline"
          >
            <Mail className="size-4" />
            {profile.email}
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {profile.stats.map((stat) => (
            <span key={stat.label} className="flex items-baseline gap-1.5">
              <span className="font-semibold">{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </span>
          ))}
        </div>

        <Button asChild variant="outline" size="lg" className="mt-4 h-10 w-full rounded-full lg:hidden">
          <a href={asset(profile.cv)} download>
            <Download className="size-4!" />
            Download CV
          </a>
        </Button>
      </div>
    </header>
  )
}
