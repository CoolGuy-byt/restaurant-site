import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "@phosphor-icons/react";

const CartContext = createContext(null);

/* ─── TOAST ─── */
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-espresso text-cream px-5 py-3 rounded-2xl shadow-2xl shadow-espresso/30 flex items-center gap-3 text-sm font-medium pointer-events-none"
    >
      <div className="w-7 h-7 bg-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-terracotta" weight="bold" />
      </div>
      {message}
    </motion.div>
  );
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const updateQty = useCallback((name, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.name !== name));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.name === name ? { ...i, qty } : i))
      );
    }
  }, []);

  const removeFromCart = useCallback((name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, i) => {
    const price = parseFloat(i.price.replace("$", ""));
    return sum + price * i.qty;
  }, 0);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        total,
        count,
      }}
    >
      {children}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={hideToast} />}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
