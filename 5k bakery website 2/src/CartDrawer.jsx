import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash } from "@phosphor-icons/react";
import { useCart } from "./CartContext";

/* ─── EASING ─── */
const EASE = [0.16, 1, 0.3, 1];

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeFromCart, clearCart, total, count } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90]"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-espresso/40 backdrop-blur-sm" />
          </motion.div>

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 z-[91] h-full w-full max-w-md bg-cream shadow-2xl shadow-espresso/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-espresso/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-terracotta/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-terracotta" weight="fill" />
                </div>
                <div>
                  <h2 className="font-display text-lg text-espresso" style={{ fontFamily: "var(--font-display)" }}>
                    Your Order
                  </h2>
                  <p className="text-xs text-espresso/40">
                    {count} item{count !== 1 ? "s" : ""} in your cart
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-espresso/40 hover:text-espresso hover:bg-espresso/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" weight="bold" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                  <div className="w-20 h-20 bg-cream-dark rounded-3xl flex items-center justify-center mb-5">
                    <ShoppingBag className="w-9 h-9 text-espresso/15" weight="regular" />
                  </div>
                  <h3 className="font-display text-lg text-espresso/60" style={{ fontFamily: "var(--font-display)" }}>
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-espresso/40 mt-2 leading-relaxed max-w-xs">
                    Browse our menu and add something delicious to get started.
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="bg-white rounded-2xl p-4 flex gap-4 border border-espresso/5"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-cream-dark">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          data-loaded="false"
                          onLoad={(e) => e.currentTarget.setAttribute('data-loaded','true')}
                          decoding="async"
                          loading="lazy"
                        />
                      </div>

                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-espresso truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center text-espresso/20 hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash className="w-4 h-4" weight="bold" />
                          </button>
                        </div>
                        <p className="text-xs text-espresso/40 mt-0.5 line-clamp-1">
                          {item.desc}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          {/* Qty Controls */}
                          <div className="flex items-center gap-1 bg-cream rounded-full p-0.5">
                            <button
                              onClick={() =>
                                updateQty(item.name, item.qty - 1)
                              }
                              className="w-7 h-7 rounded-full flex items-center justify-center text-espresso/50 hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Minus className="w-3.5 h-3.5" weight="bold" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-espresso">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateQty(item.name, item.qty + 1)
                              }
                              className="w-7 h-7 rounded-full flex items-center justify-center text-espresso/50 hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" weight="bold" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-espresso">
                            $
                            {(
                              parseFloat(item.price.replace("$", "")) * item.qty
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-espresso/5 p-6 space-y-4 bg-white/50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-espresso/50">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-espresso/50">
                    <span>Tax (8.5%)</span>
                    <span>${(total * 0.085).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-espresso pt-2 border-t border-espresso/5">
                    <span>Total</span>
                    <span>${(total * 1.085).toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-terracotta text-white font-semibold rounded-xl hover:bg-terracotta-hover transition-colors duration-200 active:scale-[0.98]"
                  style={{ transitionProperty: "color, background-color, transform" }}
                >
                  Checkout
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-espresso/40 hover:text-terracotta transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
