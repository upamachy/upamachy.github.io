import { BadgeCheck, ExternalLink, Pin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { sections } from "@/components/nav"
import { profile, type FeedItem } from "@/data/profile"
import { asset } from "@/lib/asset"

const kindLabel: Record<FeedItem["kind"], string> = {
  about: "About",
  experience: "Experience",
  project: "Project",
  education: "Education",
  certification: "Certificate",
}

export function PostCard({ item }: { item: FeedItem }) {
  const KindIcon = sections.find((section) => section.value === item.kind)?.icon

  return (
    <article className="flex gap-3 border-b p-4 transition-colors hover:bg-muted/40 sm:gap-4 sm:px-5">
      <Avatar className="size-10 shrink-0 sm:size-11">
        <AvatarImage src={asset(profile.avatar)} alt={profile.name} />
        <AvatarFallback>UC</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {item.pinned ? (
          <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Pin className="size-3.5" />
            Pinned
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm">
          <span className="font-semibold">{profile.name}</span>
          <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Verified" />
          <span className="text-muted-foreground">@{profile.handle}</span>
          <span className="text-muted-foreground" aria-hidden>
            ·
          </span>
          <span className="text-muted-foreground">{item.period}</span>
        </div>

        <h2 className="mt-1.5 text-base leading-snug font-semibold text-balance sm:text-lg">
          {item.title}
        </h2>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          {KindIcon ? <KindIcon className="size-3.5 shrink-0" /> : null}
          <span className="truncate">{item.subtitle}</span>
        </p>

        <div className="mt-2.5 space-y-2 text-[0.9375rem] leading-relaxed text-foreground/90">
          {item.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="rounded-full">
            {kindLabel[item.kind]}
          </Badge>
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>

        {item.href ? (
          <Button asChild variant="outline" size="sm" className="mt-3 rounded-full">
            <a href={asset(item.href)} target="_blank" rel="noreferrer noopener">
              <ExternalLink />
              {item.hrefLabel ?? "Open"}
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  )
}
