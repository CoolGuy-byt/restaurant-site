import Lenis from 'lenis';

// Disable Lenis on mobile/touch devices to avoid scroll jitter/flicker
const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer:coarse)').matches);

let lenisInstance = null;
let rafId = null;

if (!isMobile) {
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    if (lenisInstance) lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);
}

// Export a safe wrapper with no-ops on mobile
export const lenis = {
  enabled: !!lenisInstance,
  scrollTo: (target, opts = {}) => {
    if (lenisInstance && typeof lenisInstance.scrollTo === 'function') return lenisInstance.scrollTo(target, opts);
    // Fallback to native smooth scroll when available
    try {
      const top = typeof target === 'number' ? target : (typeof target === 'string' ? (document.querySelector(target)?.offsetTop || 0) : 0);
      return window.scrollTo({ top, behavior: opts.behavior || 'smooth' });
    } catch (e) {
      return null;
    }
  },
  raf: (t) => { if (lenisInstance && typeof lenisInstance.raf === 'function') return lenisInstance.raf(t); },
  destroy: () => { if (rafId) cancelAnimationFrame(rafId); if (lenisInstance && typeof lenisInstance.destroy === 'function') lenisInstance.destroy(); lenisInstance = null; rafId = null; },
};
