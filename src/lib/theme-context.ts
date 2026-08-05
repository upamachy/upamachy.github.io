import { createContext, useContext } from "react"

export type Theme = "light" | "dark"

export type ThemeContextValue = {
  theme: Theme
  toggle: () => void
}

export const THEME_STORAGE_KEY = "upama-theme"

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
