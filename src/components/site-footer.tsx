import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { profile } from "@/data/profile"

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold">{profile.siteName}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Built by {profile.name} with React, Tailwind, shadcn/ui and three.js.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon-lg" className="rounded-full" title="GitHub">
            <a href={profile.github} target="_blank" rel="noreferrer noopener">
              <GithubIcon className="size-4.5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon-lg" className="rounded-full" title="LinkedIn">
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <LinkedinIcon className="size-4.5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon-lg" className="rounded-full" title="Back to top">
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
