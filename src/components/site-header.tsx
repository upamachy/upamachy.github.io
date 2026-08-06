import { useState } from "react"
import { Download, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { sectionList } from "@/components/nav"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"

export function SiteHeader({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-10 min-w-0 shrink-0 flex-col justify-center">
          <span className="block truncate text-sm font-semibold tracking-tight">
            {profile.name}
          </span>
          <span className="hidden truncate text-xs text-muted-foreground sm:block">
            {profile.role}
          </span>
        </a>

        <nav aria-label="Sections" className="mx-auto hidden items-center lg:flex">
          {sectionList.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className={cn(
                "relative px-3 py-5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                active === section.id &&
                  "text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-blue-700 dark:after:bg-blue-400"
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />

          <Button asChild size="sm" className="hidden h-9 px-4 sm:inline-flex">
            <a href={asset(profile.cv)} download>
              <Download className="size-4!" />
              Résumé
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="lg:hidden">
                <Menu className="size-4.5!" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
              <SheetTitle className="border-b px-5 py-4 text-base">{profile.name}</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the portfolio
              </SheetDescription>

              <nav aria-label="Sections" className="flex flex-col p-2">
                {sectionList.map((section) => (
                  <SheetClose asChild key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-3 text-[0.9375rem] transition-colors hover:bg-muted",
                        active === section.id && "bg-muted font-medium"
                      )}
                    >
                      <span className="font-mono text-xs text-blue-700 dark:text-blue-400">
                        {section.index}
                      </span>
                      <section.icon className="size-4 text-muted-foreground" />
                      {section.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <Separator />

              <div className="flex flex-col gap-2 p-4">
                <Button asChild size="lg" className="h-11 text-base">
                  <a href={asset(profile.cv)} download>
                    <Download className="size-4.5!" />
                    Download résumé
                  </a>
                </Button>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="lg" className="h-11 flex-1">
                    <a href={profile.github} target="_blank" rel="noreferrer noopener">
                      <GithubIcon className="size-4.5" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-11 flex-1">
                    <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                      <LinkedinIcon className="size-4.5" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
