"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { InteractiveHeadline } from "@/components/interactive-headline"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-36 sm:pt-44">
      {/* parallax background */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-[8%] top-[20%] h-[300px] w-[300px] rounded-full bg-chart-2/20 blur-[100px]" />
        <div className="absolute left-[6%] top-[35%] h-[260px] w-[260px] rounded-full bg-accent blur-[100px]" />
      </motion.div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div style={{ opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
          >
            <span className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            Trusted by 12,000+ modern teams
          </motion.span>

          <InteractiveHeadline
            className="mt-7 cursor-default select-none text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            lines={[
              [{ text: "Where" }, { text: "ambition" }, { text: "meets" }],
              [{ text: "effortless", gradient: true }, { text: "design", gradient: true }],
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Lumina is the intelligent platform that helps your team design, automate, and scale —
            all from one beautifully crafted workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" className="group h-12 rounded-full px-7 text-base shadow-lg shadow-primary/25 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30">
              Start free trial
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-border bg-card/50 px-7 text-base backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:border-white hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_rgba(255,255,255,0.85)] dark:hover:bg-primary dark:hover:text-primary-foreground"
            >
              Watch demo
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* product preview with parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-16 max-w-5xl px-6"
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10 ring-1 ring-foreground/5">
          <Image
            src="/product-dashboard.png"
            alt="Lumina platform dashboard preview"
            width={1600}
            height={1067}
            priority
            className="h-auto w-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
