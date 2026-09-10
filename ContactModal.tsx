import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageCircle, MapPin, Send, Loader2 } from "lucide-react";
import { PHONE_1, PHONE_2, CONTACT_EMAIL, WHATSAPP_LINK } from "../data";
import { useState } from "react";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Simulate submission — replace with real API call when ready
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>

            <div className="p-6 sm:p-8">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">Start Your Project</h3>
                    <p className="text-sm text-gray-400">Fill out the form and I'll get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. Abebe Kebede"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-gray-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="e.g. 0911223344"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g. abebe@example.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-medium text-gray-400 mb-1">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-gray-900">Select a service...</option>
                        <option value="starter" className="bg-gray-900">Starter — ETB 5,000</option>
                        <option value="advanced" className="bg-gray-900">Advanced — ETB 10,000</option>
                        <option value="premium" className="bg-gray-900">Premium — ETB 20,000</option>
                        <option value="custom" className="bg-gray-900">Business Pro — Custom Quote</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-1">
                        Tell Me About Your Project
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Brief description of your business and what you need..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-gray-900 font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Inquiry
                        </>
                      )}
                    </button>
                  </form>

                  {/* Direct contact */}
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                    <p className="text-xs text-gray-500 text-center">Or reach out directly:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <a href={`tel:${PHONE_1}`} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> {PHONE_1}
                      </a>
                      <a href={`tel:${PHONE_2}`} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> {PHONE_2}
                      </a>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" /> Email
                      </a>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h3>
                  <p className="text-sm text-gray-400 mb-6">Thank you for reaching out. I'll review your project details and get back to you within 24 hours.</p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-xl transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
