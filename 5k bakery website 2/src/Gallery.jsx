import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Quotes,
  Grains,
} from "@phosphor-icons/react";
import scoringRitualImg from "./assets/scoring-ritual.jpg";
import handsRememberImg from "./assets/hands-remember.jpg";
import butterLayersImg from "./assets/butter-layers.jpg";
import heritageWheatImg from "./assets/heritage-wheat.jpg";
import theStarterImg from "./assets/the-starter.jpg";
import morningDisplayImg from "./assets/morning-display.jpg";
import dawnBreakImg from "./assets/dawn-break.jpg";

/* ─── EASING ─── */
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_SPRING = [0.23, 1, 0.32, 1];

/* ─── GALLERY DATA ─── */
const galleryImages = [
  {
    img: "https://picsum.photos/seed/ember-crust-oven/800/1100",
    title: "The First Loaf",
    desc: "Every morning begins with the first loaf — still trembling from the oven, crust singing.",
    size: "tall",
  },
  {
    img: scoringRitualImg,
    title: "Scoring Ritual",
    desc: "The blade makes one clean pass. The bread decides the rest.",
    size: "square",
  },
  {
    img: handsRememberImg,
    title: "Hands That Remember",
    desc: "30 years of kneading. You can feel the rhythm in every fold.",
    size: "square",
  },
  {
    img: butterLayersImg,
    title: "Butter & Layers",
    desc: "18 laminations of French butter, each one a meditation.",
    size: "wide",
  },
  {
    img: heritageWheatImg,
    title: "From the Field",
    desc: "Red Fife wheat, stone-milled the same week it's ground.",
    size: "square",
  },
  {
    img: theStarterImg,
    title: "The Starter",
    desc: "Six years old. Fed daily. More precious than any recipe.",
    size: "tall",
  },
  {
    img: morningDisplayImg,
    title: "Morning Display",
    desc: "The case is full by 7 AM. It's never full for long.",
    size: "wide",
  },
  {
    img: dawnBreakImg,
    title: "Dawn Break",
    desc: "The first light of morning finds the baker already deep in flour.",
    size: "wide",
  },
];

const galleryQuotes = [
  {
    text: "The secret of bread is patience. You can't rush what the wheat has already done its best to accomplish.",
    attribution: "Ember & Crust",
    style: "pull",
  },
  {
    text: "There is a moment, just before the bread comes out of the oven, when the whole bakery holds its breath.",
    attribution: "Ember & Crust",
    style: "dark",
  },
  {
    text: "Bread is the only food that gets better the longer you think about it.",
    attribution: "Stanley Ginsberg",
    style: "pull",
  },
];

/* ─── REVEAL WRAPPER ─── */
function Reveal({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { once: true, threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ─── IMAGE TILE ─── */
function ImageTile({ image, index, onClick, rowSpan = 1 }) {
  const tileRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      ref={tileRef}
      className={`relative rounded-2xl overflow-hidden cursor-pointer h-full
        ${rowSpan === 2 ? "md:row-span-2" : ""}
      `}
      style={{ aspectRatio: rowSpan === 2 ? "3/5" : "auto" }}
      onClick={() => onClick(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.012 : 1 }}
      transition={{ duration: 0.5, ease: EASE_SPRING }}
    >
      {/* Image with subtle scale and LQIP background */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='16' viewBox='0 0 24 16'%3E%3Crect width='100%25' height='100%25' fill='%23E8DDD0'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.img
          src={image.img}
          alt={image.title}
          className="w-full h-full object-cover"
          loading="lazy"
          data-loaded="false"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0, scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: EASE_SPRING }}
          onLoad={(e) => { e.currentTarget.setAttribute('data-loaded','true'); setLoaded(true); }}
        />
      </div>

      {/* Base gradient — always present */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />

      {/* Deeper overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      />

      {/* Warm amber tint */}
      <motion.div
        className="absolute inset-0 bg-amber-900/10 mix-blend-overlay"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      />

      {/* ── Info panel ── */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-10">

        {/* Badge + Title — always visible, lifts slightly on hover */}
        <motion.div
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.45, ease: EASE_SPRING }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[9px] tracking-[0.22em] uppercase text-cream/60 font-medium">
            <Grains className="w-3 h-3 text-terracotta/70" weight="fill" />
            Ember & Crust
          </span>
          <h3
            className="font-display text-lg md:text-xl text-cream mt-2 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {image.title}
          </h3>
        </motion.div>

        {/* Description — fades + slides in, exits cleanly */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="mt-2 text-xs text-cream/55 max-w-[90%] leading-relaxed"
            >
              {image.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Expand icon */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"
        animate={{ scale: hovered ? 1 : 0.75, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <ArrowRight className="w-3.5 h-3.5 text-white/80" weight="bold" />
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/60 to-transparent"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        style={{ transformOrigin: "center" }}
      />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border pointer-events-none"
        animate={{ borderColor: hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.04)" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

/* ─── PULL QUOTE ─── */
function PullQuote({ quote, delay = 0 }) {
  return (
    <Reveal delay={delay} y={32}>
      <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-terracotta/8 p-6 md:p-8 shadow-sm shadow-espresso/3 hover:shadow-md hover:shadow-espresso/5 hover:border-terracotta/15 transition-all duration-500 h-full flex flex-col justify-between">
        {/* Top: icon + quote */}
        <div>
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-terracotta/40 via-terracotta/20 to-transparent rounded-l-2xl" />
          <Quotes className="w-6 h-6 text-terracotta/40 mb-4" weight="fill" />
          <p
            className="font-display text-base md:text-lg italic text-espresso font-semibold leading-snug text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "{quote.text}"
          </p>
          <p className="mt-4 text-[9px] tracking-[0.2em] uppercase text-terracotta/60 font-bold">
            — {quote.attribution}
          </p>
        </div>

        {/* Bottom: decorative fill */}
        <div className="mt-6 pt-5 border-t border-terracotta/10">
          <div className="flex items-center gap-2 mb-3">
            <Grains className="w-3.5 h-3.5 text-terracotta/35" weight="fill" />
            <div className="h-px flex-1 bg-gradient-to-r from-terracotta/20 to-transparent" />
          </div>
          <p
            className="text-[11px] leading-relaxed text-espresso/40 italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Baked with patience. Every morning since 2019, before the city wakes.
          </p>
          <div className="flex gap-1.5 mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: `rgba(180,90,60,${0.15 + i * 0.08})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── DARK QUOTE CARD ─── */
function DarkQuoteCard({ quote, delay = 0 }) {
  return (
    <Reveal delay={delay} y={32}>
      <div className="rounded-2xl bg-espresso p-6 md:p-7 shadow-xl shadow-espresso/20 hover:shadow-2xl hover:shadow-espresso/30 hover:border-white/12 transition-all duration-500 h-full flex flex-col justify-center border border-white/5">
        <Quotes className="w-4 h-4 text-terracotta/35 mb-3" weight="fill" />
        <p
          className="font-display text-sm md:text-base italic leading-relaxed text-balance text-cream/80"
          style={{ fontFamily: "var(--font-display)" }}
        >
          "{quote.text}"
        </p>
        <p className="mt-3 text-[9px] tracking-[0.2em] uppercase font-semibold text-cream/25">
          — {quote.attribution}
        </p>
      </div>
    </Reveal>
  );
}

/* ─── DECORATIVE ELEMENT ─── */
function DecorativeQuote() {
  return (
    <Reveal delay={0.3} y={24}>
      <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-terracotta/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-terracotta/25" />
          <div className="w-8 h-px bg-terracotta/20" />
        </div>
        <p
          className="font-display text-base md:text-lg italic text-espresso/40 leading-snug text-balance"
          style={{ fontFamily: "var(--font-display)" }}
        >
          "Every loaf is a small act of faith."
        </p>
      </div>
    </Reveal>
  );
}

/* ─── LIGHTBOX ─── */
function Lightbox({ index, onClose, onNext, onPrev }) {
  const image = galleryImages[index];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-espresso/90 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.5, ease: EASE_SPRING }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-[90vw] max-h-[90vh] flex flex-col items-center"
      >
        {/* Counter */}
        <div className="absolute -top-10 left-0 text-cream/40 text-sm font-medium">
          {index + 1} / {galleryImages.length}
        </div>

        {/* Close */}
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" weight="bold" />
        </motion.button>

        {/* Nav arrows */}
        <button
          onClick={onPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Previous"
        >
          <ArrowLeft className="w-4 h-4" weight="bold" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Next"
        >
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-espresso/50 max-w-full max-h-[65vh]">
          {!loaded && (
            <div className="absolute inset-0 bg-espresso/30 animate-pulse rounded-2xl" />
          )}
          <motion.img
            key={image.img}
            src={image.img}
            alt={image.title}
            className="block max-h-[65vh] object-contain rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE_OUT }}
          className="mt-5 text-center max-w-md"
        >
          <h3
            className="font-display text-2xl md:text-3xl text-cream leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {image.title}
          </h3>
          <p className="mt-2.5 text-cream/50 text-sm leading-relaxed max-w-sm mx-auto">
            {image.desc}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── GALLERY SECTION ─── */
export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionInView(true); obs.disconnect(); } },
      { once: true, threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openLightbox = (index) => { setActiveIndex(index); setLightboxOpen(true); };
  const closeLightbox = () => { setLightboxOpen(false); setTimeout(() => setActiveIndex(-1), 400); };
  const nextImage = () => setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-16 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-ivory" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative orbs */}
      <motion.div
        className="absolute top-[5%] right-[8%] w-32 h-32 rounded-full bg-terracotta/4 blur-3xl pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[4%] w-24 h-24 rounded-full bg-sage/4 blur-3xl pointer-events-none"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <Reveal y={40}>
          <div className="relative mb-12 lg:mb-18">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={sectionInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              className="absolute -top-5 left-0 h-[1px] bg-gradient-to-r from-terracotta/40 via-terracotta/20 to-transparent"
              style={{ transformOrigin: "left" }}
            />
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-espresso leading-[1.05] text-balance"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stories from
              <br />
              <span className="italic text-terracotta">the oven</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-espresso/45 max-w-sm leading-relaxed">
              A visual journal — snapshots from the bakery floor,
              where the magic happens before dawn.
            </p>
          </div>
        </Reveal>

        {/* ─── Asymmetric Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-fr">

          {/* ROW 1: COL 1-2 (wide) — New dawn image filling the top-left gap */}
          <div className="md:col-span-1 lg:col-span-2 md:min-h-[260px]">
            <ImageTile image={galleryImages[7]} index={7} onClick={openLightbox} rowSpan={1} />
          </div>

          {/* ROW 1-2: COL 3 — Pull quote */}
          <div className="md:col-span-1 row-span-2">
            <PullQuote quote={galleryQuotes[0]} delay={0.1} />
          </div>

          {/* ROW 1-2: COL 4 — Tall image */}
          <div className="md:col-span-1 row-span-2">
            <ImageTile image={galleryImages[5]} index={5} onClick={openLightbox} rowSpan={2} />
          </div>

          {/* ROW 2: COL 1 — Square image */}
          <ImageTile image={galleryImages[1]} index={1} onClick={openLightbox} />

          {/* ROW 2: COL 2 — Dark quote */}
          <DarkQuoteCard quote={galleryQuotes[1]} delay={0.1} />

          {/* ROW 3: COL 1-2 (wide) — Wide image */}
          <div className="md:col-span-2">
            <ImageTile image={galleryImages[3]} index={3} onClick={openLightbox} />
          </div>

          {/* ROW 3: COL 3 — Square image */}
          <ImageTile image={galleryImages[2]} index={2} onClick={openLightbox} />

          {/* ROW 3: COL 4 — Square image */}
          <ImageTile image={galleryImages[4]} index={4} onClick={openLightbox} />

          {/* ROW 4: Full-width decorative quote divider */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <DecorativeQuote />
          </div>

          {/* ROW 5: COL 1-2 (wide) — Wide image */}
          <div className="md:col-span-2">
            <ImageTile image={galleryImages[6]} index={6} onClick={openLightbox} />
          </div>

          {/* ROW 5: COL 3-4 (wide) — Pull quote */}
          <div className="md:col-span-2">
            <PullQuote quote={galleryQuotes[2]} delay={0.1} />
          </div>
        </div>

        {/* ─── Bottom Signature ─── */}
        <Reveal delay={0.5} y={20}>
          <div className="mt-12 lg:mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-terracotta/8 shadow-sm shadow-espresso/2">
              <Grains className="w-3.5 h-3.5 text-terracotta/30" weight="fill" />
              <p className="text-[10px] tracking-[0.22em] uppercase text-espresso/30 font-semibold">
                Ember & Crust — Portland, OR — Est. 2019
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            index={activeIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
