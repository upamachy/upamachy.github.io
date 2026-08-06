import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { WoodpeckerMark } from "@/components/woodpecker-mark"
import { profile } from "@/data/profile"

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-ink bg-card">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <WoodpeckerMark className="size-10 shrink-0" />
          <div>
            <p className="font-heading text-base tracking-wide">{profile.siteName}</p>
            <p className="text-sm font-medium text-muted-foreground">
              {profile.name} · {profile.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="icon-lg"
            className="size-11 border-2 border-ink bg-background shadow-[3px_3px_0_0_var(--ink)]"
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
            className="size-11 border-2 border-ink bg-background shadow-[3px_3px_0_0_var(--ink)]"
            title="LinkedIn"
          >
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <LinkedinIcon className="size-4.5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon-lg"
            className="size-11 border-2 border-ink bg-background shadow-[3px_3px_0_0_var(--ink)]"
            title="Back to top"
          >
            <a href="#top">
              <ArrowUp className="size-4.5!" />
              <span className="sr-only">Back to top</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
