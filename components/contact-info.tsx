"use client"

import Link from "next/link"
import { Github, Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ContactInfo() {
  const contactItems = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      text: "amirmehboob921@gmail.com",
      href: "mailto:amirmehboob921@gmail.com",
    },
    {
      icon: <Linkedin className="h-5 w-5 text-primary" />,
      text: "linkedin.com/in/amir-mehboob",
      href: "https://www.linkedin.com/in/amir-ch-07050617b/",
    },
    {
      icon: <Github className="h-5 w-5 text-primary" />,
      text: "github.com/amir",
      href: "https://github.com/Amir-9251",
    },
  ]

  return (
    <Card className="border-0 bg-card/30 backdrop-blur-sm h-full">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold gradient-text">Contact Information</h3>
        <div className="space-y-3">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 group"
            // whileHover={{ x: 5 }}
            // transition={{ duration: 0.2 }}
            >
              <div className="bg-primary/10 p-2 rounded-full transition-colors duration-300 group-hover:bg-primary/20">
                {item.icon}
              </div>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 inline-block group-hover:text-primary hover-underline"
              >
                {item.text}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="pt-8">
          <h4 className="text-lg font-medium mb-4">Follow me</h4>
          <div className="flex gap-3">
            <Link href="https://github.com/Amir-9251" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full gradient-border">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/amir-ch-07050617b/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full gradient-border">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:amirmehboob921@gmail.com">
              <Button variant="outline" size="icon" className="rounded-full gradient-border">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
