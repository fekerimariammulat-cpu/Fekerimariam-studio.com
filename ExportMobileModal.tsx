import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Share2,
  Copy,
  Smartphone,
  Monitor,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Info,
} from "lucide-react";

type TabKey = "preview" | "pwa" | "deploy";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "preview", label: "Instant Preview", icon: <QrCode className="w-4 h-4" /> },
  { key: "pwa", label: "Install as App", icon: <Smartphone className="w-4 h-4" /> },
  { key: "deploy", label: "Deploy Live", icon: <ExternalLink className="w-4 h-4" /> },
];

export default function ExportMobileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("preview");
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);
  const [iosExpanded, setIosExpanded] = useState(false);
  const [androidExpanded, setAndroidExpanded] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    setShareSupported(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback – ignore */
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Fekerimariam Mulat - Web Design", url });
      } catch {
        /* user cancelled */
      }
    } else {
      await copyLink();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  Mobile Export &amp; Sharing
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-semibold transition-colors ${
                      activeTab === tab.key
                        ? "text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
                {/* ── Tab 1: Instant Preview ── */}
                {activeTab === "preview" && (
                  <div className="space-y-6">
                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-48 h-48 bg-white rounded-xl p-3 mx-auto">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}&color=10b981&bgcolor=ffffff`}
                          alt="QR Code to scan on phone"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        Scan this QR code with your phone camera to open this site instantly.
                      </p>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={shareLink}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold rounded-xl transition-colors text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        Share This Page
                      </button>
                      <button
                        onClick={copyLink}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 glass text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy Link
                          </>
                        )}
                      </button>
                    </div>

                    <div className="glass rounded-xl p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Make sure you are running the dev server (`npm run dev`) or have deployed the site for the QR code to work. The QR links to{" "}
                        <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">{url || "your-site-url"}</code>.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Tab 2: PWA Install ── */}
                {activeTab === "pwa" && (
                  <div className="space-y-5">
                    <p className="text-sm text-gray-400">
                      Install this website as an app on your phone for quick access from your home screen.
                    </p>

                    {/* iOS */}
                    <div className="glass rounded-xl overflow-hidden">
                      <button
                        onClick={() => setIosExpanded(!iosExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-emerald-400" />
                          <span className="font-semibold text-sm text-white">iPhone / Safari</span>
                        </div>
                        {iosExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <AnimatePresence>
                        {iosExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-3">
                              {[
                                "Open this page in Safari.",
                                'Tap the Share button (square with arrow up) at the bottom.',
                                'Scroll down and tap "Add to Home Screen".',
                                'Tap "Add" in the top-right corner.',
                              ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                                    {i + 1}
                                  </span>
                                  <span className="text-sm text-gray-300">{step}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Android */}
                    <div className="glass rounded-xl overflow-hidden">
                      <button
                        onClick={() => setAndroidExpanded(!androidExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Monitor className="w-5 h-5 text-cyan-400" />
                          <span className="font-semibold text-sm text-white">Android / Chrome</span>
                        </div>
                        {androidExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <AnimatePresence>
                        {androidExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-3">
                              {[
                                "Open this page in Chrome.",
                                "Tap the three-dot menu (⋮) in the top-right.",
                                'Tap "Install app" or "Add to Home screen".',
                                'Tap "Install" and then "Add".',
                              ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
                                    {i + 1}
                                  </span>
                                  <span className="text-sm text-gray-300">{step}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* ── Tab 3: Deploy ── */}
                {activeTab === "deploy" && (
                  <div className="space-y-5">
                    <p className="text-sm text-gray-400">
                      Deploy this website live so anyone can access it from any device with a custom domain.
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          name: "Vercel (Recommended)",
                          desc: "Zero-config deployment. Connect your GitHub repo and deploy in one click. Free tier includes custom domains.",
                          link: "https://vercel.com",
                        },
                        {
                          name: "Netlify",
                          desc: "Drag-and-drop folder upload or connect Git. Automatic HTTPS and CDN included.",
                          link: "https://netlify.com",
                        },
                        {
                          name: "GitHub Pages",
                          desc: "Free hosting directly from your GitHub repository. Great for portfolio sites.",
                          link: "https://pages.github.com",
                        },
                      ].map((platform) => (
                        <a
                          key={platform.name}
                          href={platform.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block glass rounded-xl p-4 hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-white group-hover:text-emerald-400 transition-colors">
                              {platform.name}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">{platform.desc}</p>
                        </a>
                      ))}
                    </div>

                    <div className="glass rounded-xl p-4 flex items-start gap-3">
                      <Download className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white mb-1">Export as ZIP</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Run <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">npm run build</code> locally to generate a static bundle in the <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">dist/</code> folder. Upload these files to any web host.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
