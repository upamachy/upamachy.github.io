import { useCallback, useState } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { PostCard } from "@/components/post-card"
import { ProfileHero } from "@/components/profile-hero"
import { RightRail } from "@/components/right-rail"
import { SideNav } from "@/components/side-nav"
import { sections, type Section } from "@/components/nav"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "@/lib/theme-context"
import { feed, profile } from "@/data/profile"
import { asset } from "@/lib/asset"

function itemsFor(section: Section) {
  if (section === "home") return feed
  return feed.filter((item) => item.kind === section)
}

function Shell() {
  const [active, setActive] = useState<Section>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const { toggle } = useTheme()

  const select = useCallback((section: Section) => {
    setActive(section)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#feed"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-320 items-start">
        <aside
          aria-label="Primary navigation"
          className="sticky top-0 hidden h-svh w-64 shrink-0 lg:block xl:w-72"
        >
          <SideNav active={active} onSelect={select} />
        </aside>

        <main className="min-w-0 flex-1 border-x">
          <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-md lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" className="rounded-full">
                  <Menu className="size-5!" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse sections of {profile.siteName}
                </SheetDescription>
                <SideNav active={active} onSelect={select} className="pt-10" />
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm leading-tight font-semibold">{profile.siteName}</p>
              <p className="truncate text-xs text-muted-foreground">{profile.role}</p>
            </div>

            <Button variant="ghost" size="icon-lg" className="rounded-full" onClick={toggle}>
              <Sun className="hidden size-5! dark:block" />
              <Moon className="size-5! dark:hidden" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Avatar className="size-8">
              <AvatarImage src={asset(profile.avatar)} alt={profile.name} />
              <AvatarFallback>UC</AvatarFallback>
            </Avatar>
          </div>

          <ProfileHero />

          <Tabs value={active} onValueChange={(value) => select(value as Section)} className="gap-0">
            <TabsList
              variant="line"
              className="sticky top-14 z-20 w-full justify-start gap-0 overflow-x-auto rounded-none border-b bg-background/85 px-2 backdrop-blur-md group-data-horizontal/tabs:h-12 lg:top-0"
            >
              {sections.map((section) => (
                <TabsTrigger
                  key={section.value}
                  value={section.value}
                  className="h-11 flex-none px-4 text-sm sm:flex-1"
                >
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div id="feed">
              {sections.map((section) => {
                const items = itemsFor(section.value)
                return (
                  <TabsContent key={section.value} value={section.value}>
                    {items.length > 0 ? (
                      items.map((item) => <PostCard key={item.id} item={item} />)
                    ) : (
                      <p className="p-8 text-center text-sm text-muted-foreground">
                        Nothing here yet.
                      </p>
                    )}
                  </TabsContent>
                )
              })}
            </div>
          </Tabs>

          <div className="border-t p-4 xl:hidden">
            <RightRail />
          </div>
        </main>

        <aside
          aria-label="Skills, certifications and contact"
          className="sticky top-0 hidden h-svh w-80 shrink-0 overflow-y-auto p-4 xl:block"
        >
          <RightRail />
        </aside>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Shell />
      </TooltipProvider>
    </ThemeProvider>
  )
}
