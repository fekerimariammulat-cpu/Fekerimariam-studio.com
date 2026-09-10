import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import type { Package, ComparisonFeature } from "../types";
import { PACKAGES, COMPARISON_FEATURES } from "../data";
import { useState } from "react";

export default function PackagesAndComparison({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeTab, setActiveTab] = useState("Design");
  const tabs = ["Design", "Content", "Marketing", "Experience", "Commerce", "Integration", "Management", "Support"];

  return (
    <section id="packages" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
        {/* ── PRICING PACKAGES ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4">Transparent Pricing, No Hidden Fees</h2>
          <p className="text-gray-400 max-w-xl mb-12">Choose the package that fits your business. All prices include design, development, and launch support.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                pkg.highlighted ? "bg-gradient-to-b from-emerald-500/20 to-transparent border-2 border-emerald-500/50 glow-emerald" : "glass hover:bg-white/5"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-gray-900 text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{pkg.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-black text-white">{pkg.price}</span>
                {pkg.priceNum > 0 && <span className="text-sm text-gray-500 ml-1">ETB</span>}
              </div>
              <ul className="flex-1 space-y-2.5 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onOpenModal} className={`w-full py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                pkg.highlighted ? "bg-emerald-500 hover:bg-emerald-400 text-gray-900" : "glass text-white hover:bg-white/10"
              }`}>
                {pkg.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* ── FEATURE COMPARISON TABLE ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-8">Compare Features</h3>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === tab ? "bg-emerald-500 text-gray-900" : "glass text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl glass">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-xs font-semibold text-gray-400">Feature</th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-400">Starter</th>
                  <th className="p-4 text-center text-xs font-semibold text-emerald-400">Advanced</th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-400">Premium</th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-400">Business Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.filter((f) => f.category === activeTab).map((feat, i) => (
                  <tr key={feat.feature} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-xs text-gray-300">{feat.feature}</td>
                    {[feat.starter, feat.advanced, feat.premium, feat.custom].map((included, ci) => (
                      <td key={ci} className="p-4 text-center">
                        {included ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
