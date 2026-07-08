"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "Lumina replaced four tools for us. Our team ships twice as fast and the interface is genuinely a joy to use every single day.",
    name: "Sarah Chen",
    role: "VP of Product, Northwind",
    initials: "SC",
  },
  {
    quote:
      "The automation engine alone saved us 30+ hours a week. It feels less like software and more like an extra teammate.",
    name: "Marcus Bell",
    role: "Head of Ops, Lattice Labs",
    initials: "MB",
  },
  {
    quote:
      "Beautifully designed, incredibly fast, and the analytics give us clarity we never had before. Onboarding took an afternoon.",
    name: "Priya Nair",
    role: "Founder, Cadence",
    initials: "PN",
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next: number) => {
    setDir(next > 0 ? 1 : -1)
    setIndex((i) => (i + next + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const id = setInterval(() => go(1), 6000)
    return () => clearInterval(id)
  }, [go])

  const t = testimonials[index]

  return (
    <section id="testimonials" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-28">
      <Reveal className="text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</span>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Loved by teams everywhere
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-lg sm:p-12">
          <Quote className="size-10 text-primary/30" />
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="pt-4"
              >
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-pretty text-xl font-medium leading-relaxed sm:text-2xl">
                  {t.quote}
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {t.initials}
                  </span>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-primary" : "w-2 bg-border",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
