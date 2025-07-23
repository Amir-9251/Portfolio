"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<null | 'success' | 'error'>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    setValidationError(null)

    // Frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError('All fields are required.')
      setIsSubmitting(false)
      return
    }

    try {
<<<<<<< HEAD
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormData({ name: "", email: "", message: "" })
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
=======
      // Simulate form submission with a delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })

      setFormState({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
>>>>>>> parent of 261892c (fix bug and clean code)
    } finally {
      setIsSubmitting(false)
    }
  }

<<<<<<< HEAD
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim()

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your message"
          className="min-h-[150px]"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className={(!isFormValid || isSubmitting) ? "cursor-not-allowed" : ""}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {validationError && (
        <div className="text-red-600 font-medium pt-2">{validationError}</div>
      )}
      {status === "success" && (
        <div className="text-green-600 font-medium pt-2">Your message has been sent!</div>
      )}
      {status === "error" && (
        <div className="text-red-600 font-medium pt-2">There was an error sending your message. Please try again later.</div>
      )}
    </form>
=======
  return (
    <Card className="border-0 bg-card/30 backdrop-blur-sm h-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Your name"
                required
                value={formState.name}
                onChange={handleChange}
                className="border-primary/20 focus:border-primary/50 transition-colors duration-300 bg-background/50"
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: formState.name ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                required
                value={formState.email}
                onChange={handleChange}
                className="border-primary/20 focus:border-primary/50 transition-colors duration-300 bg-background/50"
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: formState.email ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="relative">
              <Textarea
                id="message"
                placeholder="How can I help you?"
                rows={5}
                required
                value={formState.message}
                onChange={handleChange}
                className="border-primary/20 focus:border-primary/50 transition-colors duration-300 bg-background/50"
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: formState.message ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <Button type="submit" className="w-full rounded-full group relative overflow-hidden" disabled={isSubmitting}>
            <span className="relative z-10">
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </span>
            <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>
        </form>
      </CardContent>
    </Card>
>>>>>>> parent of 261892c (fix bug and clean code)
  )
}
