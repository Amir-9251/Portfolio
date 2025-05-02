"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Calendar, Code, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectDialogProps {
    children: React.ReactNode
    project: {
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
}

export function ProjectDialog({ children, project }: ProjectDialogProps) {
    const {
        title,
        description,
        image,
        tags,
        link,
        github,
        longDescription,
        features,
        challenges,
        date,
        role,
        team,
        testimonial,
        gallery,
    } = project

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 overflow-hidden bg-card/80 backdrop-blur-md border-primary/20">
                <DialogTitle className="sr-only">{title}</DialogTitle>
                <DialogDescription className="sr-only">{description}</DialogDescription>
                <ScrollArea className="h-full">
                    <div className="space-y-6">
                        <Tabs defaultValue="overview" className="w-full">
                            <div className="px-6 pt-2">
                                <TabsList className="w-full grid grid-cols-3">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="p-6">
                                <TabsContent value="overview" className="space-y-4 mt-0">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-muted-foreground">
                                            {longDescription ||
                                                "This project was built with a focus on user experience and performance. The goal was to create a solution that is both functional and visually appealing."}
                                        </p>

                                        {features && features.length > 0 && (
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Key Features</h3>
                                                <ul className="space-y-1">
                                                    {features.map((feature, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {challenges && challenges.length > 0 && (
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Challenges & Solutions</h3>
                                                <ul className="space-y-1">
                                                    {challenges.map((challenge, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <XCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                            <span>{challenge}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {testimonial && (
                                            <div className="bg-muted p-4 rounded-md italic border-l-4 border-primary">
                                                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                                                <p className="text-sm font-medium mt-2">
                                                    — {testimonial.author}, {testimonial.role}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="details" className="space-y-4 mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {date && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm font-medium">Date</p>
                                                    <p className="text-sm text-muted-foreground">{date}</p>
                                                </div>
                                            </div>
                                        )}

                                        {role && (
                                            <div className="flex items-center gap-2">
                                                <Code className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm font-medium">Role</p>
                                                    <p className="text-sm text-muted-foreground">{role}</p>
                                                </div>
                                            </div>
                                        )}

                                        {team && (
                                            <div className="flex items-center gap-2">
                                                <Code className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm font-medium">Team</p>
                                                    <p className="text-sm text-muted-foreground">{team}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="border-primary/20">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex flex-wrap gap-3">
                                        {link && (
                                            <Button asChild className="rounded-full">
                                                <Link href={link} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    View Live Demo
                                                </Link>
                                            </Button>
                                        )}
                                        {github && (
                                            <Button variant="outline" asChild className="rounded-full">
                                                <Link href={github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="mr-2 h-4 w-4" />
                                                    View Source Code
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="gallery" className="mt-0">
                                    {gallery && gallery.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {gallery.map((img, index) => (
                                                <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                                                    <Image
                                                        src={img || "/placeholder.svg"}
                                                        alt={`${title} screenshot ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 300px"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                                            <p>No gallery images available</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
