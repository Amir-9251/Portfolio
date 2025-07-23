"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, FileDown, Briefcase, MapPin, Calendar as CalendarIcon, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { ProjectCard } from "@/components/project-card"
import { SkillCard } from "@/components/skill-card"
import { ContactInfo } from "@/components/contact-info"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { ScrollProgress } from "@/components/scroll-progress"
import { AboutDialog } from "@/components/about-dialog"
import { projects, skills, experience, education, certifications } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"

export default function ClientPage() {
  // Add this function at the top of your component
  function handleDownloadNotification() {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("CV Download", {
          body: "Your resume is downloading...",
          icon: "/download.png", // Optional icon
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("CV Download", {
              body: "Your resume is downloading...",
              icon: "/download.png",
            });
          }
        });
      }
    }
  }

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="space-y-16 overflow-hidden">
          {/* Hero Section */}
          <section id="about" className="relative py-20 min-h-[calc(100vh-4rem)]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--hero-gradient-from),transparent_40%),radial-gradient(circle_at_bottom_left,var(--hero-gradient-to),transparent_40%)]"></div>
            <div className="container flex flex-col-reverse md:flex-row items-center gap-10 h-full">
              <FadeIn className="md:w-1/2 space-y-6 mt-10 md:mt-0" delay={0.2}>
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Frontend Developer
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <AboutDialog>
                    <span className="cursor-pointer hover:opacity-80 transition-opacity">Hi, I'm M Amir</span>
                  </AboutDialog>
                  <span className="block mt-2">
                    <AboutDialog>
                      <span className="gradient-text cursor-pointer hover:opacity-80 transition-opacity">
                        Creating digital experiences
                      </span>
                    </AboutDialog>
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  I build exceptional and accessible digital experiences for the web.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild className="rounded-full group relative overflow-hidden">
                    <Link href="#contact">
                      <span className="relative z-10">Get in touch</span>
                      <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-full gradient-border">
                    <Link href="#projects">View my work</Link>
                  </Button>
                  <Button variant="secondary" asChild className="rounded-full">
                    <a
                      href="/resume.pdf"
                      download="John_Doe_Resume.pdf"
                      onClick={handleDownloadNotification}
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </FadeIn>
              <FadeIn className="md:w-1/2 flex justify-center" delay={0.4} direction="left">
                <AboutDialog>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 gradient-border cursor-pointer hover:opacity-90 transition-opacity">
                    <Image
                      src="/amir1.jpg"
                      alt="John Doe"
                      fill
                      className="object-cover object-top transition-transform duration-700 hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 256px, 320px"
                    />
                  </div>
                </AboutDialog>
              </FadeIn>

              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
                <Link
                  href="#projects"
                  className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="text-sm mb-2">Scroll down</span>
                  <ArrowDown className="h-5 w-5 animate-bounce" />
                </Link>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20">
            <div className="container space-y-10">
              <FadeIn className="text-center space-y-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Portfolio
                </span>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">My Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Here are some of my recent projects. Each one was built with a focus on user experience and
                  performance.
                </p>
              </FadeIn>

              <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading projects...</div>}>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <StaggerItem key={index}>
                      <ProjectCard {...project} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Suspense>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--skills-gradient-from),transparent_40%),radial-gradient(circle_at_bottom_right,var(--skills-gradient-to),transparent_40%)]"></div>
            <div className="container space-y-10">
              <FadeIn className="text-center space-y-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Expertise
                </span>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">My Skills</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  I've worked with a variety of technologies in the web development world.
                </p>
              </FadeIn>

              <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading skills...</div>}>
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skills.map((skill, index) => (
                    <StaggerItem key={index}>
                      <SkillCard name={skill} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Suspense>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20">
            <div className="container space-y-10">
              <FadeIn className="text-center space-y-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Experience
                </span>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Work Experience</h2>
              </FadeIn>
              <div className="relative max-w-3xl mx-auto pl-4 border-l-2 border-primary/20">
                {experience.map((exp, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx} className="relative mb-12 group">
                    {/* Timeline Dot */}
                    <span className="absolute -left-5 top-4 w-4 h-4 bg-primary rounded-full border-4 border-background group-hover:scale-110 transition-transform"></span>
                    <div className="bg-card/40 rounded-lg shadow-lg p-6 border-l-4 border-primary/40 hover:border-primary transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <span className="text-primary font-semibold">@ {exp.company}</span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-3 items-center">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{exp.location}</span>
                        <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" />{exp.date}</span>
                      </div>
                      <ul className="space-y-2 pl-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-base text-foreground">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                ))}
                {/* Timeline End Dot */}
                <span className="absolute -left-5 bottom-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></span>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="py-20">
            <div className="container space-y-10">
              <FadeIn className="text-center space-y-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Education
                </span>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Education</h2>
              </FadeIn>
              <div className="space-y-6 max-w-2xl mx-auto">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-card/30 rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                      <span>{edu.school}</span>
                      <span>{edu.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="py-20">
            <div className="container space-y-10">
              <FadeIn className="text-center space-y-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Certifications
                </span>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Certifications</h2>
              </FadeIn>
              <div className="space-y-6 max-w-2xl mx-auto">
                {certifications.map((cert, idx) => (
                  <Card key={idx} className="border-0 bg-card/30 backdrop-blur-sm hover:shadow-md transition-shadow duration-300 h-full skill-card">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-full p-2 flex-shrink-0">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex flex-col text-left">
                        <h3 className="font-medium text-lg">{cert.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">{cert.issuer}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="container space-y-10">
              <FadeIn className="text-center space-y-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary inline-block">
                  Contact
                </span>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Get In Touch</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FadeIn delay={0.2} direction="right">
                  <ContactInfo />
                </FadeIn>

                <FadeIn delay={0.4} direction="left">
                  <ContactForm />
                </FadeIn>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
