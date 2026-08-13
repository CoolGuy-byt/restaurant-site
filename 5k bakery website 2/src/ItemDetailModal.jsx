import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "./CartContext";

/* ─── EASING ─── */
const EASE = [0.16, 1, 0.3, 1];
const SPRING = [0.23, 1, 0.32, 1];

export default function ItemDetailModal({ item, onClose }) {
  const [qty, setQty] = useState(1);
  const { addToCart, setIsOpen } = useCart();
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setQty(1);
    onClose();
  };

  const handleAddToCart = () => {
    addToCart(
      {
        name: item.name,
        price: item.price,
        desc: item.fullDesc || item.desc,
        img: item.img,
        category: item.category,
      },
      qty
    );
    setQty(1);
    handleClose();
  };

  const priceNum = parseFloat(item.price.replace("$", ""));

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: SPRING }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-espresso/20 overflow-hidden"
          style={{ maxHeight: "90dvh" }}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-espresso/60 hover:text-espresso border border-espresso/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" weight="bold" />
          </motion.button>

          <div className="flex flex-col md:flex-row" style={{ maxHeight: "90dvh" }}>
            {/* Image */}
            <div className="md:w-1/2 relative overflow-hidden">
              <motion.div
                className="w-full h-64 md:h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-espresso/70 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-7 md:p-8 flex flex-col">
              {/* Title & Price */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3
                    className="font-display text-2xl lg:text-3xl text-espresso leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-terracotta font-semibold text-xl mt-1">
                    {item.price}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 text-sm text-espresso/60 leading-relaxed flex-1">
                {item.fullDesc || item.desc}
              </p>

              {/* Divider */}
              <div className="my-6 border-t border-espresso/8" />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-espresso/70">
                    Quantity
                  </span>
                  <div className="flex items-center gap-1 bg-cream rounded-full p-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-espresso/60 hover:bg-white hover:shadow-sm transition-all duration-200"
                    >
                      <Minus className="w-4 h-4" weight="bold" />
                    </motion.button>
                    <span className="w-10 text-center text-sm font-semibold text-espresso">
                      {qty}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQty(qty + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-espresso/60 hover:bg-white hover:shadow-sm transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" weight="bold" />
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-terracotta text-white font-semibold rounded-xl hover:bg-terracotta-hover transition-colors duration-200 active:scale-[0.98]"
                  style={{ transitionProperty: "color, background-color, transform" }}
                >
                  <ShoppingBag className="w-5 h-5" weight="bold" />
                  Add to Cart — ${(priceNum * qty).toFixed(2)}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
