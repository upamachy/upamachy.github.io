import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { profile } from "@/data/profile"

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            {profile.name} · {profile.role}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.location} · Built with React, Tailwind CSS, shadcn/ui and three.js.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon-lg" title="GitHub">
            <a href={profile.github} target="_blank" rel="noreferrer noopener">
              <GithubIcon className="size-4.5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon-lg" title="LinkedIn">
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <LinkedinIcon className="size-4.5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon-lg" title="Back to top">
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
