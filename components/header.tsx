"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const sections = ["about", "projects", "skills", "contact"]

    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = sections[0]

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop - 100
          if (pageYOffset >= sectionTop) {
            newActiveSection = sectionId
          }
        }
      })

      setActiveSection(newActiveSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full backdrop-blur transition-all duration-300 ${isScrolled ? "bg-background/80 border-b" : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl gradient-text">
          M Amir
        </Link>

        <nav className="hidden md:flex gap-6">
          <NavLink href="#about" isActive={activeSection === "about"} onClick={() => scrollToSection("about")}>
            About
          </NavLink>
          <NavLink href="#projects" isActive={activeSection === "projects"} onClick={() => scrollToSection("projects")}>
            Projects
          </NavLink>
          <NavLink href="#skills" isActive={activeSection === "skills"} onClick={() => scrollToSection("skills")}>
            Skills
          </NavLink>
          <NavLink href="#contact" isActive={activeSection === "contact"} onClick={() => scrollToSection("contact")}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu for the website
              </SheetDescription>
              <nav className="flex flex-col gap-4 mt-8">
                <MobileNavLink
                  href="#about"
                  isActive={activeSection === "about"}
                  onClick={() => {
                    scrollToSection("about")
                    document.body.classList.remove("overflow-hidden")
                  }}
                >
                  About
                </MobileNavLink>
                <MobileNavLink
                  href="#projects"
                  isActive={activeSection === "projects"}
                  onClick={() => {
                    scrollToSection("projects")
                    document.body.classList.remove("overflow-hidden")
                  }}
                >
                  Projects
                </MobileNavLink>
                <MobileNavLink
                  href="#skills"
                  isActive={activeSection === "skills"}
                  onClick={() => {
                    scrollToSection("skills")
                    document.body.classList.remove("overflow-hidden")
                  }}
                >
                  Skills
                </MobileNavLink>
                <MobileNavLink
                  href="#contact"
                  isActive={activeSection === "contact"}
                  onClick={() => {
                    scrollToSection("contact")
                    document.body.classList.remove("overflow-hidden")
                  }}
                >
                  Contact
                </MobileNavLink>
                <div className="mt-4">
                  <ThemeSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}

function NavLink({ href, children, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`relative group font-medium ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      ></span>
    </a>
  )
}

function MobileNavLink({ href, children, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`py-2 px-4 rounded-md transition-colors font-medium ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"
        }`}
    >
      {children}
    </a>
  )
}
