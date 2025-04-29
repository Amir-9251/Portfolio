"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

const themes = [
  { name: "Modern Blue", value: "modern-blue", bgColor: "bg-white dark:bg-zinc-950", dotColor: "bg-blue-500" },
  { name: "Teal Breeze", value: "teal-breeze", bgColor: "bg-teal-50 dark:bg-teal-950", dotColor: "bg-teal-500" },
  {
    name: "Coral Passion",
    value: "coral-passion",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    dotColor: "bg-orange-500",
  },
  {
    name: "Lavender Dream",
    value: "lavender-dream",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    dotColor: "bg-purple-400",
  },
  { name: "Mint Fresh", value: "mint-fresh", bgColor: "bg-green-50 dark:bg-green-950", dotColor: "bg-green-500" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [currentColorTheme, setCurrentColorTheme] = useState("modern-blue")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get the color theme from localStorage or use default
    const savedColorTheme = localStorage.getItem("color-theme") || "modern-blue"
    setCurrentColorTheme(savedColorTheme)
    document.documentElement.setAttribute("data-color-theme", savedColorTheme)
  }, [])

  const handleThemeChange = (value: string) => {
    setCurrentColorTheme(value)
    localStorage.setItem("color-theme", value)
    document.documentElement.setAttribute("data-color-theme", value)
  }

  if (!mounted) {
    return null
  }

  const currentTheme = themes.find((t) => t.value === currentColorTheme) || themes[0]

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full"
      >
        <span className="sr-only">Toggle theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 rounded-full">
            <span className={`h-4 w-4 rounded-full ${currentTheme.dotColor}`} />
            <span className="hidden sm:inline-block">{currentTheme.name}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
              className="flex items-center gap-2"
            >
              <span className={`h-4 w-4 rounded-full ${theme.dotColor}`} />
              <span>{theme.name}</span>
              {currentColorTheme === theme.value && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
