"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileDown } from "lucide-react"
import Image from "next/image"
import "@/app/globals.css"

interface AboutDialogProps {
  children: React.ReactNode
}

export function AboutDialog({ children }: AboutDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer hover:opacity-80 transition-opacity">{children}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card/80 backdrop-blur-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">About Me</DialogTitle>
          <DialogDescription className="text-muted-foreground">Software Engineer</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto  custom-scrollbar">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src="amir1.jpg"
                alt="M Amir"
                fill
                className="object-cover object-top"
                sizes="128px"
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <h3 className="text-xl font-semibold">M Amir</h3>
              <p className="text-sm text-muted-foreground">Lahore, Punjab Pakistan</p>
              <div className="flex justify-center sm:justify-start gap-3">
                <Button asChild size="sm" className="rounded-full">
                  <a href="/resume.pdf" download="John_Doe_Resume.pdf">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Professional Summary</h4>
            <p className="text-muted-foreground">
              I'm a passionate Frontend Developer with 5+ years of experience creating responsive, user-friendly web
              applications. Specializing in React, Next.js, and modern JavaScript, I focus on building performant and
              accessible digital experiences.
            </p>

            <h4 className="text-lg font-medium">Background</h4>
            <p className="text-muted-foreground">
              With a background in Computer Science and a keen eye for design, I bridge the gap between technical
              functionality and aesthetic appeal. I've worked with startups and established companies across e-commerce,
              fintech, and SaaS industries.
            </p>

            <h4 className="text-lg font-medium">My Approach</h4>
            <p className="text-muted-foreground">
              I believe in clean, maintainable code and component-driven development. User experience is at the heart of
              everything I build, ensuring that applications are not only visually appealing but also intuitive and
              accessible to all users.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
