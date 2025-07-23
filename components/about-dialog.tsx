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
        <span className="cursor-pointer hover:text-primary/60 transition-all duration-200">{children}</span>
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
              Proficient Frontend Developer with expertise in building responsive, user-friendly web applications using HTML, CSS, JavaScript, TypeScript, and React.js. Strong foundation in Object-Oriented Programming (OOP) principles, enabling the creation of modular and maintainable code. Skilled in performance optimization, cross-browser compatibility, and integrating APIs. Adept at collaborating in Agile teams to deliver high-quality, scalable solutions. Passionate about creating seamless user experiences while staying current with emerging web technologies.
            </p>

            <h4 className="text-lg font-medium">Strengths</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              <li>Problem-Solving: Resolved complex software issues in previous role delivering a 40% reduction in long-standing unresolved problems.</li>
            </ul>

            <h4 className="text-lg font-medium">Languages</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              <li>English (Intermediate)</li>
              <li>Urdu (Advanced)</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
