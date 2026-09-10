import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, Home, Store, LayoutGrid, GraduationCap, UtensilsCrossed, UserRound, Globe, ShoppingCart, Shield, TrendingUp, Award, Target, Zap, FileText, ChevronDown, ChevronUp } from "lucide-react";
import type { Category, QualityLevel, Pillar } from "../types";
import { CATEGORIES, QUALITY_LEVELS, PILLARS } from "../data";
import { useState } from "react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Layers, Home, Store, LayoutGrid, GraduationCap, UtensilsCrossed, UserRound, Globe, ShoppingCart,
};

export default function ShowcaseAndValue() {
  const [activeCategory, setActiveCategory] = useState("business");
  const [activeQuality, setActiveQuality] = useState(3);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
        {/* ── ABOUT ME ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">About Me</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6">Crafting Digital Experiences That Matter</h2>
          <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
            I'm Fekerimariam Mulat, a web designer based in Ethiopia passionate about building websites that don't just look beautiful — they work. Every project starts with understanding your business goals, your customers, and what makes you different. I use modern technologies like React, TypeScript, and Tailwind CSS to deliver fast, responsive, and SEO-friendly websites that help Ethiopian businesses grow online.
          </p>
        </motion.div>

        {/* ── WHAT I BUILD (10 Categories) ── */}
        <div id="services">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">What I Build</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-10">Websites for Every Industry</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => {
              const IconComp = ICON_MAP[cat.icon];
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`glass rounded-xl p-4 sm:p-5 text-left transition-all ${isActive ? "border-emerald-500/50 bg-emerald-500/10" : "hover:border-white/20"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {IconComp && <IconComp className={`w-6 h-6 mb-3 ${isActive ? "text-emerald-400" : "text-gray-400"}`} />}
                  <div className="font-semibold text-sm text-white">{cat.label}</div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">{cat.description}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── DIGITAL FIRST IMPRESSION + QUALITY LEVELS ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Value Props */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Digital First Impression</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-8">Your Website Is Your Best Salesperson</h2>
            <div className="space-y-5">
              {[
                { icon: Shield, title: "Instant Trust", desc: "A professional website builds credibility before you even speak to a customer." },
                { icon: TrendingUp, title: "24/7 Lead Capture", desc: "Your website works around the clock — collecting inquiries while you sleep." },
                { icon: Award, title: "Brand Elevation", desc: "Stand out from competitors with a design that reflects your quality and vision." },
              ].map((vp, i) => (
                <motion.div key={i} className="flex gap-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <vp.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{vp.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{vp.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quality Progression Widget */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Quality Levels</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-8">Choose Your Level</h2>
            <div className="space-y-3">
              {QUALITY_LEVELS.map((ql) => (
                <motion.button
                  key={ql.level}
                  onClick={() => setActiveQuality(ql.level)}
                  className={`w-full text-left rounded-xl p-4 transition-all ${
                    activeQuality === ql.level ? "bg-white/10 border border-emerald-500/30" : "glass hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-black ${ql.color}`}>L{ql.level}</span>
                      <span className="font-semibold text-sm text-white">{ql.name}</span>
                    </div>
                    {activeQuality === ql.level ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </div>
                  <AnimatePresence>
                    {activeQuality === ql.level && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="text-xs text-gray-400 mb-2">{ql.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {ql.features.map((f) => (
                            <span key={f} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">{f}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── BEFORE YOU BUY ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Before You Buy</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-10">6 Pillars of a Successful Website</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map((p, i) => {
              const IconComp = ICON_MAP[p.icon];
              const isExpanded = expandedPillar === i;
              return (
                <motion.div
                  key={p.title}
                  className="glass rounded-xl p-5 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => setExpandedPillar(isExpanded ? null : i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    {IconComp && <IconComp className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                    <div>
                      <div className="font-semibold text-sm text-white">{p.title}</div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-xs text-gray-400 mt-2 leading-relaxed overflow-hidden">
                            {p.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {!isExpanded && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</div>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}