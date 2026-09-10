import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import type { PortfolioItem, ProcessStep } from "../types";
import { PORTFOLIO_ITEMS, PROCESS_STEPS } from "../data";
import { useState } from "react";

export default function WorkAndProcess({ onOpenModal }: { onOpenModal: () => void }) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const allTags = ["All", ...Array.from(new Set(PORTFOLIO_ITEMS.flatMap((p) => p.tags)))];
  const filtered = activeFilter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
        {/* ── PORTFOLIO ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Portfolio</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4">Real Results for Real Businesses</h2>
          <p className="text-gray-400 max-w-xl mb-8">Every project tells a story of transformation. Here are some of my recent works.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === tag ? "bg-emerald-500 text-gray-900" : "glass text-gray-400 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedProject(selectedProject === item.id ? null : item.id)}
              className={`group glass rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-emerald-500/30 ${
                selectedProject === item.id ? "border-emerald-500/50 ring-1 ring-emerald-500/20" : ""
              }`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-medium rounded-full">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                </div>
              </div>

              <AnimatePresence>
                {selectedProject === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3 border-t border-white/5">
                      <div>
                        <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Problem</div>
                        <p className="text-xs text-gray-300 leading-relaxed">{item.problem}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Strategy</div>
                        <p className="text-xs text-gray-300 leading-relaxed">{item.strategy}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Result</div>
                        <p className="text-xs text-emerald-400 font-medium">{item.result}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Features Built</div>
                        <ul className="space-y-1">
                          {item.features.map((f) => (
                            <li key={f} className="flex items-center gap-1.5 text-xs text-gray-300">
                              <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ── PROCESS TIMELINE ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">How I Work</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">My Proven 6-Step Process</h2>
          <p className="text-gray-400 max-w-xl mb-12">Every project follows a structured process that ensures quality, transparency, and on-time delivery.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent" />

          <div className="space-y-8 sm:space-y-12">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-950 border-2 border-emerald-500 flex items-center justify-center z-10">
                  <span className="text-xs font-black text-emerald-400">{step.step}</span>
                </div>

                {/* Content card */}
                <div className={`ml-14 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <div className="glass rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{step.description}</p>
                    <div className={`flex flex-wrap gap-1.5 ${i % 2 === 0 ? "sm:justify-end" : ""}`}>
                      {step.deliverables.map((d) => (
                        <span key={d} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-medium rounded-full flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center">
          <button onClick={onOpenModal} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 text-sm mx-auto">
            Start Your Project Today <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
