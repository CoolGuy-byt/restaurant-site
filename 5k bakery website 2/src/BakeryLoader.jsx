import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fire } from "@phosphor-icons/react";

/* ─── EASING ─── */
const EASE_OUT = [0.16, 1, 0.3, 1];

/* ─── BAKERY MESSAGES (rotate while loading) ─── */
const MESSAGES = [
  "Building the fire…",
  "Oven reaching temperature…",
  "Dough is proofing…",
  "Shaping the loaves…",
  "Sliding into the oven…",
  "First crust is forming…",
  "Almost golden…",
  "Fresh from the oven…",
];

/* ─── USE REDUCED MOTION ─── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ═══════════════════════════════════════════════════════
   FLAMES — layered, multi-speed flicker
   ═══════════════════════════════════════════════════════ */
function Flame({ delay = 0, speed = 1.4, scaleYMax = 1.25, color }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full"
      style={{
        width: 18,
        height: 52,
        left: "50%",
        marginLeft: -9,
        background: `radial-gradient(ellipse at 50% 90%, ${color} 0%, transparent 70%)`,
        filter: "blur(2px)",
        willChange: "transform, opacity",
      }}
      animate={{
        scaleY: [1, scaleYMax, 0.85, 1.15, 1],
        scaleX: [1, 0.88, 1.08, 0.92, 1],
        opacity: [0.85, 1, 0.7, 0.95, 0.85],
        rotate: [-3, 4, -5, 3, -3],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   EMBER PARTICLES — rise from the oven
   ═══════════════════════════════════════════════════════ */
function EmberParticle({ x, y, size, dur, delay, drift }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: `${y}%`,
        background: `radial-gradient(circle, #FFD580 0%, #C4724E 60%, transparent 100%)`,
        filter: "blur(0.5px)",
        boxShadow: `0 0 ${size * 2}px ${size}px rgba(196,114,78,0.3)`,
        willChange: "transform, opacity",
      }}
      animate={{
        y: -(60 + Math.random() * 50),
        x: [0, drift, -drift * 0.5, 0],
        opacity: [0, 0.9, 0.6, 0],
        scale: [0.6, 1.2, 0.8, 0.3],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function EmberParticles({ reduced }) {
  if (reduced) return null;
  const particles = Array.from({ length: 18 }, (_, i) => ({
    x: 28 + (i % 5) * 11,
    y: 35 + (i % 3) * 5,
    size: 2 + (i % 3) * 1.5,
    dur: 3 + (i % 4) * 0.8,
    delay: i * 0.25,
    drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 5) * 6),
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <EmberParticle key={i} {...p} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOUR DUST — floating in the air
   ═══════════════════════════════════════════════════════ */
function FlourParticle({ size, left, top, dur, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-cream-dark/25"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
      }}
      animate={{
        y: -100 - (size * 5),
        x: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, 0],
        opacity: [0, 0.5, 0.3, 0],
        scale: [0.7, 1, 1.3, 0.6],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function FlourDust({ reduced }) {
  if (reduced) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }, (_, i) => (
        <FlourParticle
          key={i}
          size={1.5 + (i % 4) * 0.6}
          left={(i % 12) * 8.5 + 2}
          top={80 + (i % 6) * 5}
          dur={8 + (i % 5) * 2}
          delay={i * 0.35}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   THERMOMETER — tracks bake progress
   ═══════════════════════════════════════════════════════ */
function Thermometer({ progress }) {
  const fillPercent = Math.min(progress / 100, 1) * 100;
  const temp = Math.round(100 + (progress / 100) * 400); // 100°F → 500°F

  return (
    <div className="absolute right-[-48px] top-[10%] flex flex-col items-center">
      {/* Glass tube */}
      <div className="relative w-3 h-44 rounded-full bg-espresso/10 border border-espresso/15 overflow-hidden">
        {/* Fill */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-200 ease-linear"
          style={{
            height: `${fillPercent}%`,
            background:
              progress < 40
                ? "linear-gradient(to top, #C4724E, #E8945E)"
                : "linear-gradient(to top, #C4724E, #FF8C42)",
            boxShadow:
              progress > 50
                ? "0 0 10px rgba(196,114,78,0.5), 0 0 20px rgba(255,140,66,0.2)"
                : "none",
          }}
        />
        {/* Bulb */}
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-espresso/15 border border-espresso/15" />
      </div>
      {/* Temperature label */}
      <div className="mt-3 text-center">
        <p
          className="font-display text-lg leading-none"
          style={{
            color: "#2C1810",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {temp}°
        </p>
        <p className="text-[9px] tracking-[0.15em] uppercase mt-0.5 font-semibold text-espresso/35">
          OVEN TEMP
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WOOD-FIRED OVEN — the centerpiece
   ═══════════════════════════════════════════════════════ */
function WoodFiredOven({ progress, reduced }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow behind oven */}
      <div
        className="absolute w-[420px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            progress > 30
              ? "radial-gradient(ellipse at 50% 80%, rgba(196,114,78,0.12) 0%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 80%, rgba(196,114,78,0.04) 0%, transparent 70%)",
          transition: "background 1s ease",
        }}
      />

      <motion.div
        className="relative"
        style={{ width: 260, height: 240 }}
        animate={
          !reduced
            ? {
                scaleY: [1, 1.005, 1],
                scaleX: [1, 0.998, 1],
              }
            : {}
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* ── Oven body ── */}
        {/* Outer shell — cast iron gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #4A3728 0%, #3D2B1F 30%, #2C1810 70%, #1E1008 100%)",
            clipPath:
              "polygon(5% 100%, 0% 60%, 0% 35%, 15% 5%, 50% 0%, 85% 5%, 100% 35%, 100% 60%, 95% 100%)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />

        {/* ── Oven opening arch ── */}
        <div
          className="absolute left-[15%] right-[15%] top-[18%] bottom-[12%]"
          style={{
            borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
            background:
              "linear-gradient(180deg, #0A0500 0%, #1A0E00 40%, #2A1500 100%)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), inset 0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          {/* ── Warm glow inside ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 90%, rgba(255,140,50,0.15) 0%, transparent 60%)",
            }}
          />

          {/* ── Ember bed at bottom ── */}
          <div
            className="absolute bottom-0 left-2 right-2 h-[25%] rounded-t-full"
            style={{
              background:
                "linear-gradient(to top, #FF6B2B 0%, #FF8C42 30%, #C4724E 60%, #8B4513 100%)",
              opacity: 0.7,
              filter: "blur(3px)",
            }}
          />

          {/* ── Stacked logs ── */}
          <div
            className="absolute bottom-[18%] left-[18%] right-[18%] h-[14%]"
            style={{
              background: "linear-gradient(90deg, #5C3A1E 0%, #7A5230 50%, #5C3A1E 100%)",
              borderRadius: "2px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="absolute bottom-[22%] left-[22%] right-[22%] h-[11%] -rotate-6"
            style={{
              background: "linear-gradient(90deg, #6B4423 0%, #8B6338 50%, #6B4423 100%)",
              borderRadius: "2px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* ── Flames ── */}
          <div className="absolute inset-0 flex items-end justify-center pb-[15%]">
            <div className="relative flex items-end justify-center w-full h-full">
              {/* Outer flames */}
              <Flame delay={0} speed={1.6} scaleYMax={1.3} color="rgba(255,80,20,0.6)" />
              <Flame delay={0.15} speed={1.3} scaleYMax={1.15} color="rgba(255,120,30,0.5)" />
              <Flame delay={0.3} speed={1.7} scaleYMax={1.35} color="rgba(255,60,10,0.55)" />
              <Flame delay={0.05} speed={1.5} scaleYMax={1.2} color="rgba(255,100,20,0.5)" />

              {/* Inner flames */}
              <Flame delay={0.08} speed={1.0} scaleYMax={1.4} color="rgba(255,200,60,0.7)" />
              <Flame delay={0.2} speed={0.9} scaleYMax={1.3} color="rgba(255,230,100,0.6)" />
              <Flame delay={0.25} speed={1.1} scaleYMax={1.45} color="rgba(255,180,40,0.65)" />

              {/* Core / brightest */}
              <Flame delay={0.12} speed={0.8} scaleYMax={1.2} color="rgba(255,255,180,0.5)" />
              <Flame delay={0.18} speed={0.95} scaleYMax={1.3} color="rgba(255,240,120,0.45)" />
            </div>
          </div>

          {/* ── Heat glow that intensifies with progress ── */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(255,140,50,0.08) 0%, transparent 70%)",
              opacity: 0.3 + (progress / 100) * 0.5,
            }}
          />
        </div>

        {/* ── Brick details ── */}
        {/* Left side brick pattern */}
        <div className="absolute left-[2%] top-[60%] w-[10%] h-[3%] rounded-sm bg-espresso/20" />
        <div className="absolute left-[2%] top-[68%] w-[10%] h-[3%] rounded-sm bg-espresso/20" />
        <div className="absolute left-[2%] top-[76%] w-[10%] h-[3%] rounded-sm bg-espresso/20" />

        {/* Right side brick pattern */}
        <div className="absolute right-[2%] top-[60%] w-[10%] h-[3%] rounded-sm bg-espresso/20" />
        <div className="absolute right-[2%] top-[68%] w-[10%] h-[3%] rounded-sm bg-espresso/20" />
        <div className="absolute right-[2%] top-[76%] w-[10%] h-[3%] rounded-sm bg-espresso/20" />

        {/* ── Chimney / top vent ── */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-6 rounded-t-sm"
          style={{
            background: "linear-gradient(180deg, #3D2B1F, #2C1810)",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.3)",
          }}
        />

        {/* ── Smoke wisps ── */}
        {!reduced && <SmokeParticles reduced={reduced} />}

        {/* ── Embers rising ── */}
        {!reduced && <EmberParticles reduced={reduced} />}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROGRESS BAR — styled like a heat gauge
   ═══════════════════════════════════════════════════════ */
function ProgressGauge({ progress }) {
  return (
    <div className="w-full max-w-[280px]">
      {/* Label */}
      <p className="text-[9px] tracking-[0.22em] uppercase font-semibold text-cream/30 mb-3 text-center">
        Heating the oven
      </p>

      {/* Track — overflow-hidden hard-caps the fill at 100% */}
      <div
        className="relative h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(44,24,16,0.25)" }}
      >
        {/* Glow layer behind fill */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,140,66,0.12), transparent)",
            opacity: progress > 20 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        {/* Fill */}
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${progress}%`,
            background:
              progress < 50
                ? "linear-gradient(90deg, #C4724E, #D98560)"
                : progress < 80
                ? "linear-gradient(90deg, #D98560, #FF8C42, #FFA85C)"
                : "linear-gradient(90deg, #FF8C42, #FFB347, #FFD580)",
            boxShadow:
              progress > 30
                ? "0 0 14px rgba(255,140,66,0.5), 0 0 28px rgba(196,114,78,0.25)"
                : "none",
            transition: "background 0.8s ease, box-shadow 0.5s ease",
          }}
          transition={{ duration: 0.12, ease: "linear" }}
        >
          {/* Shimmer sweep */}
          {progress > 10 && (
            <motion.div
              className="absolute inset-y-0 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              }}
              animate={{ x: ["-100%", "500%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
            />
          )}
        </motion.div>

        {/* Tick marks */}
        {[25, 50, 75].map((tick) => (
          <div
            key={tick}
            className="absolute top-1/2 -translate-y-1/2 w-px h-2 opacity-20"
            style={{ left: `${tick}%`, background: "rgba(44,24,16,0.8)" }}
          />
        ))}
      </div>

      {/* Status text */}
      <div className="mt-4 text-center h-5">
        <StatusText />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROTATING MESSAGES
   ═══════════════════════════════════════════════════════ */
function StatusText() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % MESSAGES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={index}
        className="text-xs font-medium tracking-[0.18em] uppercase"
        style={{ color: "rgba(44,24,16,0.4)" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        {MESSAGES[index]}
      </motion.p>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   GRAIN OVERLAY
   ═══════════════════════════════════════════════════════ */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 z-[100] pointer-events-none mix-blend-multiply"
      style={{ opacity: 0.3 }}
    >
      <svg className="w-full h-full">
        <filter id="loader-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#loader-grain)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SMOKE — wisps rising from chimney
   ═══════════════════════════════════════════════════════ */
function SmokeWisp({ delay, x, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: "-10px",
        background: "radial-gradient(circle, rgba(180,160,140,0.08) 0%, transparent 70%)",
        filter: "blur(4px)",
      }}
      animate={{
        y: -60 - Math.random() * 30,
        x: [0, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15, 0],
        opacity: [0, 0.4, 0.2, 0],
        scale: [0.8, 1.5, 2, 0.3],
      }}
      transition={{
        duration: 6 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function SmokeParticles({ reduced }) {
  if (reduced) return null;
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <SmokeWisp
          key={i}
          delay={i * 0.8}
          x={`${42 + (i % 3) * 6}%`}
          size={12 + (i % 3) * 6}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   HEAT SHIMMER — bottom of screen
   ═══════════════════════════════════════════════════════ */
function HeatShimmer() {
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] pointer-events-none overflow-hidden"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(255,140,50,0.05) 0%, transparent 70%)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   INNER SCENE — everything inside the loader
   ═══════════════════════════════════════════════════════ */
function LoaderScene({ reduced, progress }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden" style={{
      background: "radial-gradient(ellipse at 50% 40%, #2A1808 0%, #1E1008 40%, #0F0800 100%)",
    }}>
      {/* Grain */}
      <GrainOverlay />

      {/* Heat shimmer */}
      {!reduced && <HeatShimmer />}

      {/* Flour dust */}
      {!reduced && <FlourDust reduced={reduced} />}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Brand */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* Fire icon */}
          {!reduced && (
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                rotate: [0, -2, 3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fire className="w-10 h-10 text-terracotta" weight="fill" />
            </motion.div>
          )}

          {/* Divider */}
          <motion.div
            className="w-16 h-px bg-terracotta/25"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE_OUT }}
          />

          {/* Brand name */}
          <motion.div className="text-center">
            <h1
              className="font-display text-3xl sm:text-4xl tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(180deg, #FDF6EE 0%, #E8DDD0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ember <span className="italic">&</span> Crust
            </h1>
            <p className="text-[10px] tracking-[0.32em] uppercase mt-1.5 font-semibold text-cream/30">
              Artisan Bakery
            </p>
          </motion.div>
        </motion.div>

        {/* ── The Oven ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT }}
        >
          <WoodFiredOven progress={progress} reduced={reduced} />
        </motion.div>

        {/* ── Progress ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: EASE_OUT }}
        >
          <ProgressGauge progress={progress} />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPORTED LOADER
   ═══════════════════════════════════════════════════════ */
export default function BakeryLoader({ isLoading = true }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        // Slow down near the end for natural feel
        const remaining = 100 - prev;
        const step = remaining > 30
          ? 2.5 + Math.random() * 2.5
          : remaining > 10
          ? 1 + Math.random() * 1.5
          : 0.5 + Math.random() * 0.8;
        return Math.min(prev + step, 100);
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Corner accents */}
          {[
            { class: "top-8 left-8", border: "border-t-2 border-l-2 rounded-tl-3xl" },
            { class: "top-8 right-8", border: "border-t-2 border-r-2 rounded-tr-3xl" },
            { class: "bottom-8 left-8", border: "border-b-2 border-l-2 rounded-bl-3xl" },
            { class: "bottom-8 right-8", border: "border-b-2 border-r-2 rounded-br-3xl" },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.class} w-16 h-16 ${corner.border}`}
              style={{ borderColor: "rgba(196,114,78,0.12)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: EASE_OUT }}
            />
          ))}
          <LoaderScene reduced={reduced} progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
