import { useState } from "react"
import { Download, Menu, Moon, Sun, Terminal } from "lucide-react"
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
import { sectionList } from "@/components/nav"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"
import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"

export function SiteHeader({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false)
  const { toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a
          href="#top"
          aria-label={`${profile.siteName}, back to top`}
          className="flex shrink-0 items-center gap-2.5 rounded-lg"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Terminal className="size-4" />
          </span>
          <span className="truncate text-sm font-semibold">{profile.siteName}</span>
        </a>

        <nav aria-label="Sections" className="mx-auto hidden items-center gap-0.5 lg:flex">
          {sectionList.map((section) => (
            <Button
              key={section.id}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 rounded-full px-3 text-[0.8125rem] font-medium text-muted-foreground",
                active === section.id && "bg-muted text-foreground"
              )}
            >
              <a href={`#${section.id}`} aria-current={active === section.id ? "true" : undefined}>
                {section.label}
              </a>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Button
            variant="ghost"
            size="icon-lg"
            className="rounded-full"
            onClick={toggle}
            title="Toggle theme"
          >
            <Sun className="hidden size-4.5! dark:block" />
            <Moon className="size-4.5! dark:hidden" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button asChild size="sm" className="hidden h-9 rounded-full px-4 sm:inline-flex">
            <a href={asset(profile.cv)} download>
              <Download className="size-4!" />
              Résumé
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="rounded-full lg:hidden">
                <Menu className="size-4.5!" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
              <SheetTitle className="border-b px-5 py-4 text-base">{profile.siteName}</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the portfolio
              </SheetDescription>

              <nav aria-label="Sections" className="flex flex-col gap-1 p-3">
                {sectionList.map((section) => (
                  <SheetClose asChild key={section.id}>
                    <Button
                      asChild
                      variant="ghost"
                      size="lg"
                      className={cn(
                        "h-12 justify-start gap-3 rounded-xl px-3 text-base font-normal",
                        active === section.id && "bg-muted font-semibold"
                      )}
                    >
                      <a href={`#${section.id}`}>
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg ring-1",
                            section.accentTile,
                            section.accentRing
                          )}
                        >
                          <section.icon className="size-4!" />
                        </span>
                        {section.label}
                      </a>
                    </Button>
                  </SheetClose>
                ))}
              </nav>

              <Separator />

              <div className="flex flex-col gap-2 p-3">
                <Button asChild size="lg" className="h-11 rounded-xl text-base">
                  <a href={asset(profile.cv)} download>
                    <Download className="size-4.5!" />
                    Download résumé
                  </a>
                </Button>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="lg" className="h-11 flex-1 rounded-xl">
                    <a href={profile.github} target="_blank" rel="noreferrer noopener">
                      <GithubIcon className="size-4.5" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-11 flex-1 rounded-xl">
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
