"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Sparkles, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Showcase", href: "#showcase" },
      { label: "Metrics", href: "#metrics" },
      { label: "Reviews", href: "#testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#top" },
      { label: "Careers", href: "mailto:careers@lumina.com" },
      { label: "Blog", href: "#showcase" },
      { label: "Press", href: "mailto:press@lumina.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#features" },
      { label: "Help center", href: "mailto:support@lumina.com" },
      { label: "Community", href: "#testimonials" },
      { label: "Status", href: "#metrics" },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="grid gap-10 rounded-[2rem] border border-border bg-background p-8 shadow-sm sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Stay in the loop
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Get product updates, design tips, and team productivity ideas. No spam, ever.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubmitted(true)
              }}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="h-12 flex-1 rounded-full border border-border bg-card px-5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              <Button type="submit" size="lg" className="group h-12 rounded-full px-6">
                {submitted ? (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="size-4" /> Subscribed
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-1">
                    Subscribe
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <span className="text-lg">Lumina</span>
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              The intelligent platform for ambitious teams who care about craft.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Lumina, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#top" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#metrics" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
