import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ArrowRight, Globe, Smartphone, Zap, Check, QrCode } from "lucide-react";
import { PHONE_1, PHONE_2 } from "../data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function NavbarAndHero({
  onOpenModal,
  onOpenExportModal,
}: {
  onOpenModal: () => void;
  onOpenExportModal: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-black text-gray-900">F</span>
            <span className="hidden sm:inline">Fekerimariam Mulat</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onOpenExportModal} className="px-4 py-2 glass text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-emerald-400" /> View on Phone
            </button>
            <a href={`tel:${PHONE_1}`} className="text-xs text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> {PHONE_1}
            </a>
            <button onClick={onOpenModal} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 text-sm font-semibold rounded-full transition-colors flex items-center gap-1.5">
              Start Your Website <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg text-gray-200 hover:text-emerald-400 transition-colors py-2 border-b border-white/5">
                  {l.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button onClick={() => { onOpenExportModal(); setMobileOpen(false); }} className="mt-2 px-6 py-3 glass text-white font-medium rounded-full text-center flex items-center justify-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-400" /> View on Phone / Export
                </button>
                <a href={`tel:${PHONE_1}`} className="text-gray-300 py-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" /> {PHONE_1}
                </a>
                <a href={`tel:${PHONE_2}`} className="text-gray-300 py-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" /> {PHONE_2}
                </a>
                <button onClick={() => { onOpenModal(); setMobileOpen(false); }} className="mt-2 px-6 py-3 bg-emerald-500 text-gray-900 font-semibold rounded-full text-center">
                  Start Your Website
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <motion.div animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-emerald-400 mb-6">
              <Zap className="w-3.5 h-3.5" /> Premium Web Design in Ethiopia
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] mb-6">
              Modern Websites That Drive{" "}
              <span className="text-gradient">Real Business Growth</span>{" "}
              in Ethiopia
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed mb-8">
              I design and build fast, beautiful websites that turn visitors into customers. From startups to established businesses — your digital presence matters.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={onOpenModal} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 text-sm">
                Start Your Website <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#work" className="px-6 py-3 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                View My Work <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              {[
                { icon: Smartphone, text: "100% Mobile Ready" },
                { icon: Zap, text: "Ultra Fast Loading" },
                { icon: Globe, text: "SEO Optimized" },
              ].map((b) => (
                <span key={b.text} className="flex items-center gap-1.5">
                  <b.icon className="w-4 h-4 text-emerald-400" /> {b.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} className="relative hidden lg:block">
            <div className="relative glow-emerald rounded-2xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop" alt="Website mockup" className="w-full h-auto rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
            </div>
            {/* Floating stat cards */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -left-4 glass-strong rounded-xl p-4">
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-gray-400">Mobile Responsive</div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -top-4 -right-4 glass-strong rounded-xl p-4">
              <div className="text-2xl font-black text-cyan-400">&lt;3s</div>
              <div className="text-xs text-gray-400">Load Time</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs">
          <span>Scroll to explore</span>
          <Check className="w-4 h-4 rotate-90" />
        </motion.div>
      </section>
    </>
  );
}
