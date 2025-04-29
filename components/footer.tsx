import Link from "next/link"
import { Github, Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-background/80 backdrop-blur">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-muted-foreground">© {new Date().getFullYear()} M Amir. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-1">Built with Next.js and Tailwind CSS</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="mailto:john.doe@example.com">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
