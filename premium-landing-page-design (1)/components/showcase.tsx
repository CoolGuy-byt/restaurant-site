"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { LayoutDashboard, Workflow, BarChart3 } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const tabs = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "A command center for everything",
    description:
      "See every project, metric, and task in one adaptive workspace that updates the moment your data does.",
  },
  {
    id: "automation",
    icon: Workflow,
    label: "Automation",
    title: "Workflows that run themselves",
    description:
      "Chain triggers and actions visually. Lumina handles the rest, so nothing slips through the cracks.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    title: "Insights you can act on",
    description:
      "Real-time dashboards and AI-generated summaries turn raw numbers into confident decisions.",
  },
]

export function Showcase() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <section id="showcase" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">Product tour</span>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          See Lumina in action
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 grid items-center gap-10 rounded-[2rem] border border-border bg-card p-6 shadow-lg sm:p-10 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-text"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {current.description}
              </p>
              <ul className="mt-6 space-y-3">
                {["Built for speed", "No code required", "Works with your stack"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-img"}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-border shadow-xl"
            >
              <Image
                src="/product-dashboard.png"
                alt={`Lumina ${current.label} view`}
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
