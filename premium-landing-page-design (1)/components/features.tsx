"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Zap, ShieldCheck, Workflow, LineChart, Plus } from "lucide-react"
import { Reveal, Stagger, staggerItem } from "@/components/reveal"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Lightning workflows",
    summary: "Automate repetitive work and ship faster with zero friction.",
    detail:
      "Build multi-step automations with a visual editor, trigger them on any event, and let Lumina handle the busywork while your team focuses on what matters.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise security",
    summary: "SOC 2 Type II, SSO, and granular role-based permissions.",
    detail:
      "Your data is encrypted in transit and at rest. Configure SSO, audit every action, and stay compliant with built-in governance controls out of the box.",
  },
  {
    icon: Workflow,
    title: "Connected by design",
    summary: "Integrate the tools you already use in a single click.",
    detail:
      "Over 150 native integrations keep everything in sync. Push data between apps, build custom connections with our API, and keep your stack unified.",
  },
  {
    icon: LineChart,
    title: "Insightful analytics",
    summary: "Understand performance with real-time dashboards.",
    detail:
      "Track the metrics that matter with customizable dashboards, automated reports, and AI-powered insights that surface trends before they become problems.",
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = feature.icon

  return (
    <motion.button
      type="button"
      variants={staggerItem}
      onClick={() => setOpen((v) => !v)}
      whileHover={{ y: -4 }}
      className="group flex w-full flex-col rounded-3xl border border-border bg-card p-7 text-left shadow-sm transition-shadow hover:shadow-xl hover:shadow-foreground/5"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-6" />
        </span>
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300",
            open && "rotate-45 bg-primary text-primary-foreground",
          )}
        >
          <Plus className="size-4" />
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight">{feature.title}</h3>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{feature.summary}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden text-pretty text-sm leading-relaxed text-foreground/80"
          >
            {feature.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">Features</span>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Everything you need, nothing you don&apos;t
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Tap any card to explore how Lumina elevates the way your team works.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" delay={0.05}>
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </Stagger>
    </section>
  )
}
