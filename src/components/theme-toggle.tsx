import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

export function ThemeToggle() {
  const { toggle } = useTheme()

  return (
    <Button variant="ghost" size="icon-lg" onClick={toggle} title="Toggle theme">
      <Sun className="hidden size-4.5! dark:block" />
      <Moon className="size-4.5! dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
