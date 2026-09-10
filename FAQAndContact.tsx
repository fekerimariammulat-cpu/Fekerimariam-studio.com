import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Check, ChevronDown, ChevronUp, Send } from "lucide-react";
import { PHONE_1, PHONE_2, CONTACT_EMAIL, WHATSAPP_LINK } from "../data";
import { useState } from "react";

const FAQ_DATA = [
  { q: "How long does it take to build a website?", a: "Most projects are completed within 2-4 weeks depending on complexity. A simple landing page can be ready in 1 week, while a full e-commerce site may take 4-6 weeks." },
  { q: "Do you offer ongoing maintenance?", a: "Yes! All packages include 30 days of free post-launch support. After that, I offer monthly maintenance plans starting at 2,000 ETB/month for updates, backups, and security monitoring." },
  { q: "Will my website work on mobile phones?", a: "Absolutely. Every website I build is 100% mobile-responsive. In Ethiopia, where most internet users access the web via phone, this is non-negotiable." },
  { q: "How can I preview or export the website on my phone?", a: 'Click the "View on Phone" button in the navigation bar to open a modal with a scannable QR code, share link options, and step-by-step instructions for installing the site as a phone app (PWA) or deploying it live.' },
  { q: "Can I update the website content myself?", a: "Yes! I build websites with user-friendly content management systems. You will be able to update text, images, and products without any technical knowledge." },
  { q: "What if I am not satisfied with the design?", a: "Every package includes revision rounds. I work collaboratively — you will see designs early and provide feedback throughout the process. Your satisfaction is guaranteed." },
  { q: "Do you help with hosting and domain registration?", a: "Yes, I handle everything from domain registration (.com, .et) to hosting setup and deployment. I recommend reliable providers and manage the technical setup for you." },
];

export default function FAQAndContact({ onOpenModal }: { onOpenModal: () => void }) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
        {/* ── FAQ ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-xl mb-12">Everything you need to know before starting your project.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((faq, i) => {
            const isExpanded = expandedFaq === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-sm text-white pr-4">{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CONTACT / CTA ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Get Started</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-base sm:text-lg">
            Let&apos;s discuss your project. Reach out today and get a free consultation — no commitment required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href={`tel:${PHONE_1}`} className="glass rounded-full px-6 py-3 text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> {PHONE_1}
            </a>
            <a href={`tel:${PHONE_2}`} className="glass rounded-full px-6 py-3 text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> {PHONE_2}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="glass rounded-full px-6 py-3 text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Email Me
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-6 py-3 text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
            </a>
          </div>

          {/* Final CTA Button */}
          <button onClick={onOpenModal} className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-gray-900 font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] text-base flex items-center gap-2 mx-auto shadow-lg shadow-emerald-500/20">
            Start Your Website Now <Send className="w-4 h-4" />
          </button>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs text-gray-500">
            {[
              "Free Consultation",
              "No Upfront Risk",
              "Money-Back Guarantee",
              "Ethiopian-Based Support",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
