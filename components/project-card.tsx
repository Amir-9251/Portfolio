"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ProjectDialog } from "@/components/project-dialog"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  github?: string
  longDescription?: string
  features?: string[]
  challenges?: string[]
  date?: string
  role?: string
  team?: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  gallery?: string[]
}

export function ProjectCard(project: ProjectCardProps) {
  const { title, description, image, tags, link, github } = project

  return (
    <ProjectDialog project={project}>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full cursor-pointer" layout>
        <Card className="overflow-hidden border-0 h-full transition-all duration-300 bg-card/30 backdrop-blur-sm flex flex-col shadow-md hover:shadow-lg">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-106"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-6 space-y-4 flex flex-col flex-1">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-2 line-clamp-3">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              {link && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-full gradient-border"
                  onClick={(e) => e.stopPropagation()} // Prevent dialog from opening
                >
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {github && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-full gradient-border"
                  onClick={(e) => e.stopPropagation()} // Prevent dialog from opening
                >
                  <Link href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ProjectDialog>
  )
}
