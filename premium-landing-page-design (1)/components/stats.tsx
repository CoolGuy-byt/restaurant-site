"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { Reveal } from "@/components/reveal"

type Stat = {
  value: number
  suffix: string
  label: string
  decimals?: number
}

const stats: Stat[] = [
  { value: 12000, suffix: "+", label: "Teams onboarded" },
  { value: 99.9, suffix: "%", label: "Uptime guarantee", decimals: 1 },
  { value: 4.2, suffix: "M", label: "Workflows automated", decimals: 1 },
  { value: 38, suffix: "%", label: "Avg. time saved" },
]

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const formatted =
    value >= 1000 && decimals === 0
      ? Math.round(display).toLocaleString()
      : display.toFixed(decimals)

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section id="metrics" className="scroll-mt-24 px-6 py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-primary px-6 py-16 text-primary-foreground shadow-xl sm:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Numbers that speak for themselves
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-primary-foreground/70">
            Performance you can measure, results your team can feel.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="mt-2 text-sm text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
