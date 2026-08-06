import { useState } from "react"
import { Download, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { WoodpeckerMark } from "@/components/woodpecker-mark"
import { sectionList } from "@/components/nav"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"

export function SiteHeader({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-4 border-ink bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-8">
        <a href="#top" className="flex min-w-0 shrink-0 items-center gap-2.5">
          <WoodpeckerMark className="size-9 shrink-0 sm:size-10" />
          <span className="hidden truncate font-heading text-lg tracking-wide sm:block">
            {profile.siteName}
          </span>
          <span className="truncate font-heading text-lg tracking-wide sm:hidden">Upama</span>
        </a>

        <nav aria-label="Sections" className="mx-auto hidden items-center gap-1 lg:flex">
          {sectionList.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className={cn(
                "rounded-lg border-2 border-transparent px-3 py-1.5 text-sm font-bold transition-transform hover:-translate-y-0.5",
                active === section.id
                  ? "border-ink bg-marigold text-ink shadow-[3px_3px_0_0_var(--ink)]"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />

          <Button
            asChild
            size="sm"
            className="hidden h-10 border-2 border-ink bg-tomato px-4 font-bold text-ink shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:bg-tomato sm:inline-flex"
          >
            <a href={asset(profile.cv)} download>
              <Download className="size-4!" />
              Résumé
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="size-10 border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] lg:hidden"
              >
                <Menu className="size-5!" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full gap-0 border-l-4 border-ink p-0 sm:max-w-sm">
              <SheetTitle className="flex items-center gap-2.5 border-b-4 border-ink px-5 py-4 font-heading text-xl">
                <WoodpeckerMark className="size-8" />
                {profile.siteName}
              </SheetTitle>
              <SheetDescription className="sr-only">Jump to a section</SheetDescription>

              <nav aria-label="Sections" className="flex flex-col gap-2.5 p-4">
                {sectionList.map((section) => (
                  <SheetClose asChild key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "rounded-xl border-4 border-ink px-4 py-3 font-heading text-lg tracking-wide text-ink shadow-[5px_5px_0_0_var(--ink)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none",
                        section.color
                      )}
                    >
                      {section.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="flex flex-col gap-2.5 border-t-4 border-ink p-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 border-2 border-ink bg-primary text-base font-bold shadow-[4px_4px_0_0_var(--ink)]"
                >
                  <a href={asset(profile.cv)} download>
                    <Download className="size-5!" />
                    Grab the résumé
                  </a>
                </Button>
                <div className="flex gap-2.5">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1 border-2 border-ink font-bold shadow-[4px_4px_0_0_var(--ink)]"
                  >
                    <a href={profile.github} target="_blank" rel="noreferrer noopener">
                      <GithubIcon className="size-4.5" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1 border-2 border-ink font-bold shadow-[4px_4px_0_0_var(--ink)]"
                  >
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
