import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { lenis } from "./lenis";
import { motion, useInView } from "framer-motion";
import {
  Coffee,
  Clock,
  MapPin,
  Phone,
  InstagramLogo,
  FacebookLogo,
  ArrowRight,
  Star,
  Envelope,
  ArrowUpRight,
  Grains,
  Leaf,
  Fire,
  PenNib,
  X,
  Quotes,
  Heart,
  Sparkle,
  ShoppingBag,
} from "@phosphor-icons/react";
import BakeryLoader from "./BakeryLoader";
import Gallery from "./Gallery";
import { CartProvider, useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import ItemDetailModal from "./ItemDetailModal";
import heroImg from "./assets/hero.jpg";
import aboutBakeryImg from "./assets/about-bakery.jpg";
import countrySourdoughImg from "./assets/country-sourdough.jpg";
import butterCroissantImg from "./assets/butter-croissant.jpg";
import chocolateBabkaImg from "./assets/chocolate-babka.jpg";
import rusticRyeImg from "./assets/rustic-rye.jpg";
import berryTartImg from "./assets/berry-tart.jpg";
import honeyOatBreadImg from "./assets/honey-oat-bread.jpg";
import painAuChocolatImg from "./assets/pain-au-chocolat.jpg";
import pumpkinSpiceRollImg from "./assets/pumpkin-spice-roll.jpg";
import ciabattaImg from "./assets/ciabatta.jpg";
import cinnamonRollImg from "./assets/cinnamon-roll.jpg";
import focacciaRosemaryImg from "./assets/focaccia-rosemary.jpg";
import lemonTartImg from "./assets/lemon-tart.jpg";
import sundayLoafImg from "./assets/sunday-loaf.jpg";

/* ─── EASING CONSTANTS ─── */
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_SPRING = [0.23, 1, 0.32, 1];

/* ─── REUSABLE SCROLL REVEAL WRAPPER ─── */
function Reveal({ children, delay = 0, y = 32, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



/* ─── CART ICON (Nav) ─── */
function CartIcon() {
  const { count, setIsOpen } = useCart();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="relative p-2 text-espresso/80 hover:text-espresso transition-colors duration-200"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6" weight="fill" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-terracotta text-white text-[11px] font-bold rounded-full flex items-center justify-center"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}

/* ─── NAVBAR ─── */
const navLinks = [
  { label: "Home", href: "#hero" },
  {
    label: "Our Story",
    href: "#about",
    dropdown: [
      { label: "Our Philosophy", href: "#philosophy" },
      { label: "The Process", href: "#process" },
    ],
  },
  {
    label: "Menu",
    href: "#products",
    dropdown: [
      { label: "Breads", href: "#breads" },
      { label: "Pastries", href: "#pastries" },
      { label: "Cakes", href: "#cakes" },
      { label: "Seasonal", href: "#seasonal" },
    ],
  },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit Us", href: "#visit" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseLeave = (e) => {
    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm shadow-espresso/5"
          : "bg-transparent"
        }`}
      style={{ height: 72 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Fire className="w-7 h-7 text-terracotta" weight="fill" />
          </motion.div>
          <span
            className="font-display text-xl tracking-tight text-espresso"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ember <span className="text-terracotta">&</span> Crust
          </span>
        </a>

        {/* Desktop Nav */}
        <div
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={handleMouseLeave}
        >
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
            >
              <a
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${scrolled
                    ? "text-espresso/80 hover:text-espresso hover:bg-espresso/5"
                    : "text-espresso/90 hover:text-espresso"
                  }`}
                style={{ transitionProperty: "color, background-color" }}
              >
                {link.label}
              </a>
              {/* Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: EASE_SPRING }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl shadow-lg shadow-espresso/10 border border-espresso/5 p-2"
                    >
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 rounded-xl text-sm text-espresso/70 hover:text-espresso hover:bg-cream-dark transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Cart + CTA + Mobile Toggle */}
        <div className="flex items-center gap-1">
          <CartIcon />
          <a
            href="#visit"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-medium rounded-full hover:bg-chocolate transition-colors duration-200 active:scale-[0.97]"
            style={{ transitionProperty: "color, background-color, transform" }}
          >
            Order Now
            <ArrowRight className="w-4 h-4" weight="bold" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-espresso"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="absolute w-full h-0.5 bg-espresso origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute w-full h-0.5 bg-espresso"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="absolute w-full h-0.5 bg-espresso origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="lg:hidden overflow-hidden bg-cream/98 backdrop-blur-md"
      >
        <div className="px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-espresso font-medium rounded-xl hover:bg-cream-dark transition-colors"
              >
                {link.label}
              </a>
              {link.dropdown && (
                <div className="ml-6 mt-1 space-y-1">
                  {link.dropdown.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-espresso/60 hover:text-espresso rounded-xl hover:bg-cream-dark transition-colors"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <a
              href="#visit"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-3 bg-espresso text-cream font-medium rounded-full active:scale-[0.97] transition-transform"
            >
              Order Now
            </a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

/* ─── HERO SECTION ─── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-terracotta/5 blur-3xl" />
        <div
          className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] rounded-full bg-sage/8 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <Reveal delay={0.25}>
              <h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-espresso text-balance"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Baked with fire,
                <br />
                <span className="text-terracotta italic">made with love</span>
              </h1>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="mt-6 text-base sm:text-lg text-espresso/65 max-w-md leading-relaxed">
                Every loaf tells a story of patience, 72-hour cold fermentation,
                stone-ground flour, and a wood-fired oven that never cools down.
              </p>
            </Reveal>

            <Reveal delay={0.65}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-espresso text-cream text-sm font-semibold rounded-full hover:bg-chocolate transition-colors duration-200 active:scale-[0.97]"
                  style={{ transitionProperty: "color, background-color, transform" }}
                >
                  Explore Menu
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-espresso/20 text-espresso text-sm font-semibold rounded-full hover:border-terracotta hover:text-terracotta transition-colors duration-200 active:scale-[0.97]"
                  style={{ transitionProperty: "color, border-color, transform" }}
                >
                  Our Story
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.8}>
              <div className="mt-10 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-cream bg-warm-stone overflow-hidden"
                    >
                      <img
                        src={`https://picsum.photos/seed/baker${i}/80/80`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-terracotta" weight="fill" />
                    ))}
                  </div>
                  <p className="text-xs text-espresso/50 mt-0.5">
                    2,400+ happy customers
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image - Asymmetric */}
          <div className="relative block lg:block">
            <div className="relative">
              {/* Main hero image */}
              <motion.div
                className="rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-espresso/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <img
                  src={heroImg}
                  alt="Fresh artisan bread from the oven"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating card 1 - top left */}
              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg shadow-espresso/10 p-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: EASE_OUT }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center">
                    <Fire className="w-5 h-5 text-terracotta" weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs text-espresso/50">Oven Type</p>
                    <p className="text-sm font-semibold text-espresso">Wood-Fired</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 2 - bottom right */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg shadow-espresso/10 p-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5, ease: EASE_OUT }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-sage" weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs text-espresso/50">Ingredients</p>
                    <p className="text-sm font-semibold text-espresso">100% Organic</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] border-2 border-terracotta/20 -z-10" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ─── MARQUEE SECTION ─── */
function Marquee() {
  const items = [
    "Sourdough", "Croissants", "Brioche", "Baguettes", "Pain au Chocolat",
    "Cinnamon Rolls", "Focaccia", "Danish Pastry", "Muffins", "Tartlets",
    "Rye Bread", "Ciabatta",
  ];

  return (
    <div className="py-8 bg-espresso overflow-hidden marquee-section">
      <div className="flex items-center gap-20 w-max marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-cream/70 text-lg font-display italic tracking-wide whitespace-nowrap"
          >
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`r-${i}`}
            className="flex-shrink-0 text-cream/70 text-lg font-display italic tracking-wide whitespace-nowrap"
          >
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`r2-${i}`}
            className="flex-shrink-0 text-cream/70 text-lg font-display italic tracking-wide whitespace-nowrap"
          >
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`r3-${i}`}
            className="flex-shrink-0 text-cream/70 text-lg font-display italic tracking-wide whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT / PHILOSOPHY ─── */
function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left - Image (larger, asymmetric) */}
          <div className="lg:col-span-7">
            <Reveal className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-espresso/5">
                <img
                  src={aboutBakeryImg}
                  alt="Bakery interior with warm lighting"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl border-2 border-terracotta/20 -z-10" />
            </Reveal>
          </div>

          {/* Right - Text */}
          <div className="lg:col-span-5 lg:pt-12">
            <Reveal delay={0.15}>
              <h2
                className="font-display text-4xl lg:text-5xl tracking-tight text-espresso mt-4 leading-[1.1]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Flour, water, salt, and fire
              </h2>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-6 text-espresso/65 leading-relaxed">
                Ember & Crust was born from a simple belief: that bread should be
                made the way it's meant to be, slowly, intentionally, and with
                respect for the ingredients. We don't rush fermentation. We don't
                use shortcuts. Every morning at 3 AM, our ovens are lit and the
                dough is shaping.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="mt-4 text-espresso/65 leading-relaxed">
                Our sourdough starters are over 6 years old, passed down from
                our founding baker. We mill our own flour from locally grown
                heritage wheat, and our butter comes from a single dairy farm
                just 30 miles from our kitchen.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 mt-8 text-terracotta font-semibold text-sm group"
              >
                Learn more about our process
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PHILOSOPHY / VALUES ─── */
function Philosophy() {
  const values = [
    {
      icon: <Fire className="w-6 h-6" weight="fill" />,
      title: "Wood-Fired",
      desc: "Our deck oven reaches 500°F, creating the signature crackling crust and open crumb structure our breads are known for.",
      bg: "bg-terracotta/5",
    },
    {
      icon: <Grains className="w-6 h-6" weight="fill" />,
      title: "Heritage Grains",
      desc: "We source stone-milled flour from heritage wheat varieties, Red Fife, Marquis, and hard white, grown within 100 miles of our kitchen.",
      bg: "bg-sage/5",
    },
    {
      icon: <Clock className="w-6 h-6" weight="fill" />,
      title: "72-Hour Ferment",
      desc: "Our sourdough rests for a full three days. Slow fermentation develops deeper flavor, better nutrition, and a crust that sings.",
      bg: "bg-warm-stone/50",
    },
    {
      icon: <Leaf className="w-6 h-6" weight="fill" />,
      title: "Zero Waste",
      desc: "Stale bread becomes breadcrumbs and panzanella. Scraps are composted or fed to our local farm neighbors. Nothing leaves our kitchen unused.",
      bg: "bg-terracotta/5",
    },
  ];

  return (
    <section id="philosophy" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal>
          <h2
            className="font-display text-4xl lg:text-5xl tracking-tight text-espresso text-center max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Crafted with intention, not speed
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -6 }}
                className={`group p-8 rounded-3xl ${v.bg} border border-transparent hover:border-espresso/5 transition-all duration-300 cursor-default h-full`}
                style={{ transitionProperty: "transform, border-color, background-color" }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${v.bg} group-hover:scale-110 transition-transform duration-300`}
                >
                  {v.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-espresso">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm text-espresso/55 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCTS SECTION ─── */
function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  // Auto-activate category from hash links (e.g. #breads, #pastries)
  useEffect(() => {
    const categoryMap = { breads: "breads", pastries: "pastries", cakes: "cakes", seasonal: "seasonal" };
    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (categoryMap[hash]) {
        setActiveCategory(categoryMap[hash]);
      }
    };
    // Run on mount
    checkHash();
    // Listen for hash changes (clicking anchors)
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "breads", label: "Breads" },
    { id: "pastries", label: "Pastries" },
    { id: "cakes", label: "Cakes" },
    { id: "seasonal", label: "Seasonal" },
  ];

  const products = [
    {
      name: "Country Sourdough",
      category: "breads",
      price: "$8",
      desc: "72-hour fermented, stone-milled flour",
      fullDesc: "Our flagship loaf. A 2-pound round of country sourdough with an amber, crackling crust and an open, honeycomb crumb. Made with stone-milled heritage wheat flour and our 6-year-old starter, fermented for a full 72 hours for depth of flavor that can't be rushed.",
      img: countrySourdoughImg,
    },
    {
      name: "Butter Croissant",
      category: "pastries",
      price: "$5",
      desc: "Danish butter, 18 laminations",
      fullDesc: "Flaky, golden, impossibly light. Our croissants go through 18 delicate layers of French butter folded into the dough, then proofed overnight. The result: a shattering outer crust and a tender, almost melting interior.",
      img: butterCroissantImg,
    },
    {
      name: "Chocolate Babka",
      category: "pastries",
      price: "$7",
      desc: "Belgian chocolate, cinnamon swirl",
      fullDesc: "A braided masterpiece of enriched dough, rolled with a generous filling of Belgian dark chocolate and warm cinnamon. Each slice reveals the beautiful spiral inside. Best enjoyed warm with a cup of coffee.",
      img: chocolateBabkaImg,
    },
    {
      name: "Rustic Rye",
      category: "breads",
      price: "$9",
      desc: "Caraway, molasses, sourdough starter",
      fullDesc: "Deep, complex, and satisfyingly dense. Our rye combines whole rye flour with a touch of blackstrap molasses for warmth, toasted caraway seeds for aroma, and a sourdough tang that ties it all together. A bread that demands good butter.",
      img: rusticRyeImg,
    },
    {
      name: "Berry Tart",
      category: "cakes",
      price: "$6",
      desc: "Seasonal berries, pastry cream",
      fullDesc: "A buttery shortcrust shell filled with velvety vanilla pastry cream, topped with whatever the farmers' market is giving us this week. Each tart is a one-off — blueberry, strawberry, raspberry, or whatever the season offers.",
      img: berryTartImg,
    },
    {
      name: "Honey Oat Loaf",
      category: "breads",
      price: "$7",
      desc: "Local wildflower honey, rolled oats",
      fullDesc: "Soft, slightly sweet, and deeply comforting. We use wildflower honey from a hive three miles from our kitchen, fold in toasted rolled oats for texture, and bake until the top is a rich golden brown. Perfect for toast or sandwiches.",
      img: honeyOatBreadImg,
    },
    {
      name: "Pain au Chocolat",
      category: "pastries",
      price: "$5",
      desc: "Two bars of Valrhona chocolate",
      fullDesc: "The classic French bakery staple, done right. Flaky laminated dough wrapped around two substantial bars of Valrhona dark chocolate. The chocolate melts into pockets of pure indulgence with every break. A morning essential.",
      img: painAuChocolatImg,
    },
    {
      name: "Pumpkin Spice Roll",
      category: "seasonal",
      price: "$6",
      desc: "Spiced cake, cream cheese frosting",
      fullDesc: "Our take on the autumn favorite: a light pumpkin-spice cake rolled in linen, filled with tangy cream cheese frosting, and dusted with cinnamon. Available September through November while the season lasts. Each slice tastes like a warm sweater.",
      img: pumpkinSpiceRollImg,
    },
    {
      name: "Ciabatta",
      category: "breads",
      price: "$6",
      desc: "Italian-style, olive oil, airy crumb",
      fullDesc: "Crispy on the outside, wonderfully pillowy inside. Our ciabatta is built on a high-hydration dough with extra virgin olive oil, giving it an open crumb perfect for soaking up olive oil, balsamic, or your favorite sandwich fillings.",
      img: ciabattaImg,
    },
    {
      name: "Cinnamon Roll",
      category: "pastries",
      price: "$5",
      desc: "Brown butter, cream cheese glaze",
      fullDesc: "Soft, pillowy dough swirled with browned-butter cinnamon sugar, baked until golden, and draped in a thick layer of tangy cream cheese glaze. They're made fresh every hour between 7 and 11 AM. Don't wait.",
      img: cinnamonRollImg,
    },
    {
      name: "Focaccia Rosemary",
      category: "breads",
      price: "$7",
      desc: "Sea salt, rosemary, olive oil",
      fullDesc: "Golden, dimpled, and fragrant. Our focaccia is baked in a well-seasoned steel pan with a generous amount of olive oil, creating an irresistibly crisp bottom. Topped with fresh rosemary and Maldon sea salt.",
      img: focacciaRosemaryImg,
    },
    {
      name: "Lemon Tart",
      category: "cakes",
      price: "$6",
      desc: "Curd, buttery crust, torched meringue",
      fullDesc: "Bright, tart, and perfectly balanced. A buttery shortcrust shell holds a silky lemon curd made with fresh Meyer lemons, then crowned with a light torched meringue. Sweet, sour, and everything in between.",
      img: lemonTartImg,
    },
  ];

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Anchor targets for menu dropdown links */}
        {categories.map((cat) => (
          <div key={cat.id} id={cat.id} className="-translate-y-24" />
        ))}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <Reveal>
            <h2
              className="font-display text-4xl lg:text-5xl tracking-tight text-espresso"
              style={{ fontFamily: "var(--font-display)" }}
            >
              From our oven
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.95] ${activeCategory === cat.id
                      ? "bg-espresso text-cream"
                      : "bg-white text-espresso/60 hover:text-espresso border border-espresso/10"
                    }`}
                  style={{ transitionProperty: "color, background-color, border-color, transform" }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="popLayout">
          <div key={activeCategory} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <Reveal key={product.name} delay={0.05 * i}>
                <motion.div
                  onClick={() => setSelectedItem(product)}
                  className="group cursor-pointer"
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="rounded-2xl overflow-hidden bg-white shadow-sm shadow-espresso/5 aspect-[4/5] relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/15 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-espresso/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-cream text-sm font-medium">
                        View Details
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg text-espresso" style={{ fontFamily: "var(--font-display)" }}>
                        {product.name}
                      </h3>
                      <span className="text-terracotta font-semibold">{product.price}</span>
                    </div>
                    <p className="text-sm text-espresso/50 mt-1">{product.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── FEATURED / SIGNATURE PIECE ─── */
function Featured() {
  return (
    <section id="process" className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Text - left offset */}
          <div className="lg:col-span-5 lg:col-start-2 lg:order-1">
            <Reveal>
              <span className="text-xs tracking-[0.2em] uppercase text-terracotta font-semibold">
                Signature Piece
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display text-4xl lg:text-5xl tracking-tight text-espresso mt-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Sunday Loaf
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-espresso/65 leading-relaxed">
                Our Sunday Loaf is what we're most proud of. A towering,
                2-pound round of country sourdough with an amber, crackling
                crust and a honeycomb crumb. We bake it every weekend in our
                wood-fired deck oven, and it sells out by noon.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-2xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <p className="text-2xl font-display text-espresso">72h</p>
                    <p className="text-xs text-espresso/50">Fermentation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center">
                    <Fire className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <p className="text-2xl font-display text-espresso">500°F</p>
                    <p className="text-xs text-espresso/50">Oven Temp</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image - right offset, large */}
          <div className="lg:col-span-5 lg:-ml-12 lg:order-2">
            <Reveal delay={0.2}>
              <motion.div
                className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-espresso/10"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <img
                  src={sundayLoafImg}
                  alt="The Sunday Loaf - signature sourdough"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ─── REVIEW MODAL ─── */
function ReviewModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [review, setReview] = useState({ name: "", email: "", rating: 0, title: "", comment: "" });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.rating === 0) return;
    if (!review.name.trim() || !review.comment.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setStep(1);
      setReview({ name: "", email: "", rating: 0, title: "", comment: "" });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.35, ease: EASE_SPRING }}
        className="glass-review-dark glass-review-dark-hover relative w-full max-w-lg rounded-3xl p-8 lg:p-10 overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Decorative blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-cream/40 hover:text-cream hover:bg-white/10 transition-all duration-200 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="relative z-10 text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto bg-terracotta/20 rounded-full flex items-center justify-center mb-6"
            >
              <Heart className="w-9 h-9 text-terracotta" weight="fill" />
            </motion.div>
            <h3 className="font-display text-2xl text-cream mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Thank you! 🎉
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              Your review has been submitted. We truly appreciate you taking the time to share your experience.
            </p>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-terracotta/15 rounded-2xl flex items-center justify-center">
                <PenNib className="w-5 h-5 text-terracotta" weight="fill" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-cream" style={{ fontFamily: "var(--font-display)" }}>
                  Leave a Review
                </h3>
                <p className="text-xs text-cream/40">Your feedback means the world to us</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-cream/60 mb-3">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.button
                      key={s}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="star-btn p-1"
                      onMouseEnter={() => setHoveredStar(s)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setReview({ ...review, rating: s })}
                    >
                      <Star
                        className={`w-8 h-8 ${s <= (hoveredStar || review.rating)
                            ? "text-terracotta"
                            : "text-cream/20"
                          }`}
                        weight={s <= (hoveredStar || review.rating) ? "fill" : "light"}
                      />
                    </motion.button>
                  ))}
                  {review.rating > 0 && (
                    <span className="ml-2 text-sm text-terracotta font-medium">
                      {review.rating === 5 ? "Amazing!" : review.rating === 4 ? "Great!" : review.rating === 3 ? "Good" : review.rating === 2 ? "Fair" : "Okay"}
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="review-name" className="block text-sm font-medium text-cream/60 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="review-name"
                  value={review.name}
                  onChange={(e) => setReview({ ...review, name: e.target.value })}
                  className="glass-input-dark w-full px-4 py-3 rounded-xl text-cream text-sm placeholder:text-cream/25"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="review-email" className="block text-sm font-medium text-cream/60 mb-2">
                  Email (not published)
                </label>
                <input
                  type="email"
                  id="review-email"
                  value={review.email}
                  onChange={(e) => setReview({ ...review, email: e.target.value })}
                  className="glass-input-dark w-full px-4 py-3 rounded-xl text-cream text-sm placeholder:text-cream/25"
                  placeholder="your@email.com"
                />
              </div>

              {/* Review Title */}
              <div>
                <label htmlFor="review-title" className="block text-sm font-medium text-cream/60 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  id="review-title"
                  value={review.title}
                  onChange={(e) => setReview({ ...review, title: e.target.value })}
                  className="glass-input-dark w-full px-4 py-3 rounded-xl text-cream text-sm placeholder:text-cream/25"
                  placeholder="What did you love?"
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="review-comment" className="block text-sm font-medium text-cream/60 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review-comment"
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  rows={4}
                  className="glass-input-dark w-full px-4 py-3 rounded-xl text-cream text-sm placeholder:text-cream/25 resize-none"
                  placeholder="Tell us about your experience..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={review.rating === 0}
                className="review-submit-glow w-full py-3.5 bg-terracotta text-cream font-semibold rounded-xl hover:bg-terracotta-hover transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-terracotta"
                style={{ transitionProperty: "color, background-color, transform" }}
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const carouselRef = useRef(null);
  const isDraggingRef = useRef(false);   // true while mouse button is held
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const velocity = useRef(0);            // px / frame for momentum
  const lastX = useRef(0);              // previous mousemove x
  const rafId = useRef(null);           // requestAnimationFrame id

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Local Food Blogger",
      quote: "The Sunday Loaf changed the way I think about bread. I've never tasted anything with that depth of flavor, like eating a piece of the countryside.",
      img: "https://picsum.photos/seed/sarahm/200/200",
      rating: 5,
    },
    {
      name: "James K.",
      role: "Regular Customer",
      quote: "I drive 40 minutes every Saturday for their croissants. Yes, it's that good. The lamination is perfect and the butter flavor is incredible.",
      img: "https://picsum.photos/seed/jamesk/200/200",
      rating: 5,
    },
    {
      name: "Lena R.",
      role: "Chef at The Oak Table",
      quote: "I source all my bakery needs from Ember & Crust now. Their commitment to quality is unmatched in this city. The rye bread alone is worth the visit.",
      img: "https://picsum.photos/seed/lenar/200/200",
      rating: 5,
    },
    {
      name: "David T.",
      role: "Sourdough Enthusiast",
      quote: "As someone who bakes at home, I can tell you the fermentation here is chef-level. The crumb structure on their country sourdough is textbook perfect.",
      img: "https://picsum.photos/seed/davitt/200/200",
      rating: 5,
    },
    {
      name: "Mia C.",
      role: "Pastry Lover",
      quote: "The pain au chocolat is hands-down the best I've had outside of Paris. Rich, flaky, and the chocolate is perfectly tempered. I'm obsessed.",
      img: "https://picsum.photos/seed/miac/200/200",
      rating: 5,
    },
    {
      name: "Robert H.",
      role: "Neighborhood Regular",
      quote: "We've hosted three birthday parties here. The custom cakes are beautiful and the staff goes above and beyond. My daughter's floral cake was a masterpiece.",
      img: "https://picsum.photos/seed/robh/200/200",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-visible lg:overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-terracotta/3 rounded-full blur-3xl" />
        <div className="absolute bottom-[5%] right-[8%] w-[350px] h-[350px] bg-sage/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase text-terracotta font-semibold">
              Testimonials
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Sparkle key={i} className="w-3.5 h-3.5 text-terracotta" weight="fill" />
                ))}
              </div>
              <p className="text-sm text-espresso/60">
                <span className="font-semibold text-espresso">4.9</span> average rating
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <h2
            className="font-display text-4xl lg:text-5xl tracking-tight text-espresso mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What people say
          </h2>
        </Reveal>

        {/* Horizontal Scroll Carousel */}
        <div className="mt-16">
          <div
            ref={carouselRef}
            className="carousel-scroll"
            onMouseDown={(e) => {
              if (e.target.closest('.cta-review')) return;
              if (rafId.current) cancelAnimationFrame(rafId.current);
              velocity.current = 0;
              isDraggingRef.current = true;
              dragStart.current = { x: e.pageX, scrollLeft: carouselRef.current.scrollLeft };
              lastX.current = e.pageX;
              carouselRef.current.classList.add("dragging");
              e.preventDefault(); // prevent text selection
            }}
            onMouseMove={(e) => {
              if (!isDraggingRef.current || !carouselRef.current) return;
              const dx = e.pageX - lastX.current;
              velocity.current = dx;
              lastX.current = e.pageX;
              const walk = (e.pageX - dragStart.current.x);
              carouselRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
            }}
            onMouseUp={() => {
              if (!isDraggingRef.current) return;
              isDraggingRef.current = false;
              if (carouselRef.current) {
                carouselRef.current.classList.remove("dragging");
              }
              const el = carouselRef.current;
              const startMomentum = () => {
                if (Math.abs(velocity.current) < 0.5) return;
                el.scrollLeft -= velocity.current;
                velocity.current *= 0.92;
                rafId.current = requestAnimationFrame(startMomentum);
              };
              rafId.current = requestAnimationFrame(startMomentum);
            }}
            onMouseLeave={(e) => {
              if (!isDraggingRef.current) return;
              isDraggingRef.current = false;
              if (carouselRef.current) {
                carouselRef.current.classList.remove("dragging");
              }
              const el = carouselRef.current;
              const startMomentum = () => {
                if (Math.abs(velocity.current) < 0.5) return;
                el.scrollLeft -= velocity.current;
                velocity.current *= 0.92;
                rafId.current = requestAnimationFrame(startMomentum);
              };
              rafId.current = requestAnimationFrame(startMomentum);
            }}
            onTouchStart={(e) => {
              if (e.target.closest('.cta-review')) return;
              if (rafId.current) cancelAnimationFrame(rafId.current);
              const x = e.touches[0].pageX;
              velocity.current = 0;
              isDraggingRef.current = true;
              dragStart.current = { x, scrollLeft: carouselRef.current.scrollLeft };
              lastX.current = x;
              carouselRef.current.classList.add('dragging');
            }}
            onTouchMove={(e) => {
              if (!isDraggingRef.current || !carouselRef.current) return;
              const x = e.touches[0].pageX;
              const dx = x - lastX.current;
              velocity.current = dx;
              lastX.current = x;
              const walk = x - dragStart.current.x;
              carouselRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
            }}
            onTouchEnd={() => {
              if (!isDraggingRef.current) return;
              isDraggingRef.current = false;
              if (carouselRef.current) carouselRef.current.classList.remove('dragging');
              const el = carouselRef.current;
              const startMomentum = () => {
                if (Math.abs(velocity.current) < 0.5) return;
                el.scrollLeft -= velocity.current;
                velocity.current *= 0.92;
                rafId.current = requestAnimationFrame(startMomentum);
              };
              rafId.current = requestAnimationFrame(startMomentum);
            }}
            onTouchCancel={() => {
              if (!isDraggingRef.current) return;
              isDraggingRef.current = false;
              if (carouselRef.current) carouselRef.current.classList.remove('dragging');
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="review-card review-card-bg review-card-hover" style={{ position: "relative", overflow: "hidden" }}>
                <Quotes className="w-8 h-8 text-terracotta/6 absolute top-5 right-5" weight="fill" />
                <div className="flex items-center gap-1 px-7 pt-7">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-terracotta" weight="fill" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-espresso/70 px-7 pt-3 pb-2">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 px-7 pb-7 pt-4 mt-1 border-t border-espresso/5">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-cream"
                  />
                  <div>
                    <p className="text-sm font-semibold text-espresso">
                      {t.name}
                    </p>
                    <p className="text-xs text-espresso/40">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div
              onClick={() => setModalOpen(true)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: ((e.clientX - rect.left) / rect.width) * 100,
                  y: ((e.clientY - rect.top) / rect.height) * 100,
                });
              }}
              className="review-card cta-review cursor-pointer flex flex-col items-center justify-center text-center px-7 py-10"
              style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}
            >
              <div className="w-14 h-14 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-4 hover:bg-terracotta/15 transition-colors duration-300">
                <PenNib className="w-6 h-6 text-terracotta transition-transform duration-300 pen-nib-icon" weight="fill" />
              </div>
              <h3 className="font-display text-base text-espresso mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Share your experience
              </h3>
              <p className="text-xs text-espresso/50 leading-relaxed max-w-[200px]">
                Loved your visit? We'd be honored to hear about it.
              </p>
              <div className="flex items-center gap-1.5 text-terracotta font-semibold text-xs mt-4 transition-all duration-300 cta-arrow-wrapper">
                Write a Review
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 cta-arrow" weight="bold" />
              </div>
            </div>
          </div>

          <div className="carousel-hint mt-4">
            <ArrowRight className="w-4 h-4" weight="bold" />
            Swipe to explore more reviews
          </div>
        </div>


      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ReviewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── VISIT US / CONTACT ─── */
function Visit() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formState.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formState.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="visit" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div>
            <Reveal>
              <span className="text-xs tracking-[0.2em] uppercase text-terracotta font-semibold">
                Visit Us
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display text-4xl lg:text-5xl tracking-tight text-espresso mt-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Come say hello
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-espresso/65 leading-relaxed">
                Our doors open at 6 AM when the first loaves come out of the
                oven. The smell of fresh bread and espresso is our way of
                saying good morning.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <p className="font-semibold text-espresso">Location</p>
                    <p className="text-sm text-espresso/55 mt-1">
                      142 Oak Street, Downtown<br />
                      Portland, OR 97205
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <p className="font-semibold text-espresso">Hours</p>
                    <p className="text-sm text-espresso/55 mt-1">
                      Mon - Fri: 6:00 AM - 3:00 PM<br />
                      Sat - Sun: 7:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warm-stone/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-espresso/60" />
                  </div>
                  <div>
                    <p className="font-semibold text-espresso">Contact</p>
                    <p className="text-sm text-espresso/55 mt-1">
                      (503) 555-0142<br />
                      hello@emberandcrust.com
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Social */}
            <Reveal delay={0.45}>
              <div className="mt-10 flex items-center gap-4">
                <a
                  href="#"
                  className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center border border-espresso/5 hover:border-terracotta hover:text-terracotta transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <InstagramLogo className="w-5 h-5" weight="fill" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center border border-espresso/5 hover:border-terracotta hover:text-terracotta transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FacebookLogo className="w-5 h-5" weight="fill" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div>
            <Reveal delay={0.15}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm shadow-espresso/5">
                <h3 className="font-display text-2xl text-espresso" style={{ fontFamily: "var(--font-display)" }}>
                  Send us a message
                </h3>
                <p className="text-sm text-espresso/50 mt-2">
                  Custom orders, catering inquiries, or just want to say hi.
                </p>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-sage/10 rounded-2xl text-sage text-sm font-medium"
                  >
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </motion.div>
                )}

                {error && (
                  <div className="mt-6 p-4 bg-terracotta/10 rounded-2xl text-terracotta text-sm font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-espresso/70 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-espresso/10 bg-cream text-espresso text-sm placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-espresso/70 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-espresso/10 bg-cream text-espresso text-sm placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-espresso/70 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-espresso/10 bg-cream text-espresso text-sm placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200 resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-espresso text-cream font-semibold rounded-xl hover:bg-chocolate transition-colors duration-200 active:scale-[0.98]"
                    style={{ transitionProperty: "color, background-color, transform" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER BANNER ─── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="py-20 lg:py-24 bg-espresso overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-[700px] mx-auto px-6 text-center">
        <Reveal>
          <Coffee className="w-10 h-10 text-terracotta mx-auto mb-6" weight="fill" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display text-3xl lg:text-4xl tracking-tight text-cream"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fresh bread, straight to your inbox
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-cream/60 text-base max-w-md mx-auto">
            Weekly specials, new menu drops, and baking tips. No spam, just
            good stuff. Unsubscribe anytime.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <form
            onSubmit={handleSubscribe}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-xl bg-cream/10 border border-cream/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all"
              required
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-terracotta text-cream font-semibold rounded-xl hover:bg-terracotta-hover transition-colors duration-200 active:scale-[0.97] whitespace-nowrap"
              style={{ transitionProperty: "color, background-color, transform" }}
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-chocolate pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Fire className="w-6 h-6 text-terracotta" weight="fill" />
              <span className="font-display text-lg text-cream tracking-tight">
                Ember <span className="text-terracotta">&</span> Crust
              </span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-xs">
              Artisan bread and pastries, baked fresh every morning with
              heritage grains and wood-fired ovens.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream font-semibold text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Our Story", "Menu", "Gallery", "Visit Us"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="text-cream/40 text-sm hover:text-cream transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h4 className="text-cream font-semibold text-sm mb-4">
              Menu
            </h4>
            <ul className="space-y-3">
              {["Sourdough", "Croissants", "Cakes & Tarts", "Seasonal Items", "Coffee & Drinks"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#products"
                      className="text-cream/40 text-sm hover:text-cream transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream font-semibold text-sm mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-cream/40 text-sm">
                <MapPin className="w-4 h-4 text-terracotta flex-shrink-0" />
                142 Oak Street, Portland
              </li>
              <li className="flex items-center gap-2 text-cream/40 text-sm">
                <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                (503) 555-0142
              </li>
              <li className="flex items-center gap-2 text-cream/40 text-sm">
                <Envelope className="w-4 h-4 text-terracotta flex-shrink-0" />
                hello@emberandcrust.com
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-cream/5 rounded-xl flex items-center justify-center text-cream/40 hover:text-terracotta hover:bg-cream/10 transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramLogo className="w-5 h-5" weight="fill" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-cream/5 rounded-xl flex items-center justify-center text-cream/40 hover:text-terracotta hover:bg-cream/10 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookLogo className="w-5 h-5" weight="fill" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/25 text-xs">
            © {new Date().getFullYear()} Ember & Crust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-cream/25 text-xs hover:text-cream/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-cream/25 text-xs hover:text-cream/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCROLL TO TOP ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      onClick={() => lenis.scrollTo(0)}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-espresso text-cream rounded-full shadow-lg shadow-espresso/20 flex items-center justify-center hover:bg-chocolate active:scale-[0.97] transition-colors duration-200"
      style={{ transitionProperty: "color, background-color, transform, opacity" }}
      aria-label="Scroll to top"
    >
      <ArrowRight className="w-5 h-5 rotate-[-90deg]" weight="bold" />
    </motion.button>
  );
}

/* ─── APP ─── */
function AppInner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading screen — shown until isLoaded */}
      <BakeryLoader isLoading={!isLoaded} />

      {/* Main content fades in after loader exits */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
            className="min-h-screen bg-cream"
          >
            <Navbar />
            <Hero />
            <Marquee />
            <About />
            <Philosophy />
            <Products />
            <Featured />
            <Gallery />
            <Testimonials />
            <Visit />
            <Newsletter />
            <Footer />
            <ScrollToTop />
            <CartDrawer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
