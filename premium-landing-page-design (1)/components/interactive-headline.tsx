"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react"

type Word = { text: string; gradient?: boolean }

const PREMIUM_EASE = [0.34, 1.56, 0.64, 1] as const

// Distance (px) within which a letter reacts to the cursor.
const INFLUENCE = 100

type LetterController = {
  el: HTMLSpanElement | null
  glow: ReturnType<typeof useMotionValue<number>>
}

function Letter({
  char,
  gradient,
  register,
}: {
  char: string
  gradient?: boolean
  register: (c: LetterController) => void
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const glow = useMotionValue(0)
  const scale = useSpring(useMotionValue(1), { stiffness: 320, damping: 20, mass: 0.5 })
  const lift = useSpring(useMotionValue(0), { stiffness: 320, damping: 20, mass: 0.5 })

  // Derive scale / lift from the raw glow value.
  useEffect(() => {
    const unsub = glow.on("change", (g) => {
      scale.set(1 + g * 0.3)
      lift.set(-g * 7)
    })
    return unsub
  }, [glow, scale, lift])

  useEffect(() => {
    register({ el: ref.current, glow })
  }, [register, glow])

  return (
    <motion.span
      ref={ref}
      style={{
        scale,
        y: lift,
        textShadow: useMotionTemplate`0 ${lift}px 30px color-mix(in oklch, var(--primary) calc(${glow} * 70%), transparent)`,
      }}
      className={
        gradient
          ? "inline-block bg-gradient-to-br from-primary via-chart-2 to-primary bg-[length:200%_200%] bg-clip-text text-transparent will-change-transform"
          : "inline-block will-change-transform"
      }
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
}

export function InteractiveHeadline({
  lines,
  className,
}: {
  lines: Word[][]
  className?: string
}) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const controllers = useRef<LetterController[]>([])
  const pointer = useRef({ x: 0, y: 0, active: false })
  const raf = useRef<number | null>(null)

  const register = (c: LetterController) => {
    controllers.current.push(c)
  }

  useEffect(() => {
    const loop = () => {
      const { x, y, active } = pointer.current
      for (const c of controllers.current) {
        if (!c.el) continue
        if (!active) {
          c.glow.set(0)
          continue
        }
        const r = c.el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dist = Math.hypot(x - cx, y - cy)
        const influence = Math.max(0, 1 - dist / INFLUENCE)
        // ease the falloff for a softer bloom
        c.glow.set(influence * influence)
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  const handleMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY, active: true }
  }
  const handleLeave = () => {
    pointer.current = { ...pointer.current, active: false }
  }

  let wordIndex = 0

  return (
    <motion.h1
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((word) => {
            const delay = 0.07 * wordIndex
            wordIndex += 1
            const letters =
              word.gradient ? (
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="inline-block"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  {word.text.split("").map((c, i) => (
                    <Letter key={i} char={c} gradient register={register} />
                  ))}
                </motion.span>
              ) : (
                word.text.split("").map((c, i) => (
                  <Letter key={i} char={c} register={register} />
                ))
              )
            return (
              <motion.span
                key={`${li}-${word.text}`}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay, ease: PREMIUM_EASE }}
                className="relative mr-[0.25em] inline-block"
              >
                {letters}
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.h1>
  )
}
