import { Download, Mail, Moon, Sun, Terminal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { sections, type Section } from "@/components/nav"
import { useTheme } from "@/lib/theme-context"
import { profile } from "@/data/profile"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"

type SideNavProps = {
  active: Section
  onSelect: (section: Section) => void
  className?: string
}

export function SideNav({ active, onSelect, className }: SideNavProps) {
  const { toggle } = useTheme()

  return (
    <nav className={cn("flex h-full flex-col gap-1 p-3", className)} aria-label="Sections">
      <a
        href="#top"
        onClick={(event) => {
          event.preventDefault()
          onSelect("home")
        }}
        className="mb-2 flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Terminal className="size-4.5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold leading-tight">{profile.siteName}</span>
          <span className="block truncate text-xs text-muted-foreground">@{profile.handle}</span>
        </span>
      </a>

      {sections.map((section) => (
        <Button
          key={section.value}
          variant="ghost"
          size="lg"
          aria-current={active === section.value ? "page" : undefined}
          onClick={() => onSelect(section.value)}
          className={cn(
            "h-11 justify-start gap-3 rounded-full px-4 text-base font-normal",
            active === section.value && "font-semibold"
          )}
        >
          <section.icon className="size-5!" />
          {section.label}
        </Button>
      ))}

      <Button asChild size="lg" className="mt-3 h-11 rounded-full text-base">
        <a href={asset(profile.cv)} download>
          <Download className="size-5!" />
          Download CV
        </a>
      </Button>

      <Separator className="my-3" />

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
        <Button asChild variant="ghost" size="icon-lg" className="rounded-full" title="Email">
          <a href={`mailto:${profile.email}`}>
            <Mail className="size-4.5!" />
            <span className="sr-only">Email</span>
          </a>
        </Button>
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
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-full p-2 pr-3 transition-colors hover:bg-muted">
        <Avatar className="size-9">
          <AvatarImage src={asset(profile.avatar)} alt={profile.name} />
          <AvatarFallback>UC</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">{profile.name}</p>
          <p className="truncate text-xs text-muted-foreground">{profile.role}</p>
        </div>
      </div>
    </nav>
  )
}
