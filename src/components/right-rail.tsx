import { BadgeCheck, Mail, Phone, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { certifications, profile, skillGroups, topSkills } from "@/data/profile"
import { cn } from "@/lib/utils"

export function RightRail({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Card className="gap-4 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4" />
            Working with
          </CardTitle>
          <CardDescription>The stack I reach for most</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-1.5">
          {topSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-full">
              {skill}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="gap-4 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Full toolkit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skillGroups.map((group, index) => (
            <div key={group.label}>
              {index > 0 ? <Separator className="mb-3" /> : null}
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {group.label}
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">
                {group.items.join(" · ")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="gap-4 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BadgeCheck className="size-4" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {certifications.map((certification, index) => (
            <div key={certification.title}>
              {index > 0 ? <Separator className="mb-3" /> : null}
              <p className="text-sm font-medium leading-snug">{certification.title}</p>
              <p className="text-sm text-muted-foreground">
                {certification.issuer} · {certification.date}
              </p>
              {certification.credential ? (
                <p className="mt-0.5 text-xs text-muted-foreground">ID {certification.credential}</p>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="gap-4 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Get in touch</CardTitle>
          <CardDescription>Usually replies within a day</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Button asChild variant="outline" size="lg" className="h-10 justify-start rounded-full">
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4!" />
              <span className="truncate">{profile.email}</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-10 justify-start rounded-full">
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <Phone className="size-4!" />
              {profile.phone}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-10 justify-start rounded-full">
            <a href={profile.github} target="_blank" rel="noreferrer noopener">
              <GithubIcon className="size-4" />
              github.com/{profile.handle}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-10 justify-start rounded-full">
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
          </Button>
        </CardContent>
      </Card>

      <p className="px-2 pb-2 text-xs text-muted-foreground">
        Built by {profile.name} with React, Tailwind, shadcn/ui and three.js.
      </p>
    </div>
  )
}
