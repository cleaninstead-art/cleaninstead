"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed
    const wasDismissed = localStorage.getItem("pwa-install-dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Check if it's iOS Safari (no beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = !window.matchMedia("(display-mode: browser)").matches === false && isIOS;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after a short delay so it doesn't interrupt immediately
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // For iOS Safari, show a different prompt after a delay
    if (isIOS && !window.navigator.standalone) {
      setTimeout(() => setShowPrompt(true), 5000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  if (!showPrompt || dismissed) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000] p-4 animate-slide-up-pwa">
      <div
        className="max-w-md mx-auto rounded-2xl p-5 shadow-2xl border"
        style={{
          background: "white",
          borderColor: "var(--accent)",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: "var(--light-text)" }}
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <img src="/pwa-icon-192.png" alt="CleanInstead" className="w-10 h-10 rounded-lg" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4
              className="font-bold text-base mb-1"
              style={{ color: "var(--primary)", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Add CleanInstead to Home Screen
            </h4>
            <p className="text-sm mb-3" style={{ color: "var(--light-text)" }}>
              {isIOS ? (
                <>
                  Tap <span className="inline-block"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "-3px" }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-2.5 1.5L12 8l3.5 5-2.5-1.5v5h-2z" /><path d="M18.94 5.06A9.936 9.936 0 0012 2a9.936 9.936 0 00-6.94 3.06L4 3v6h6L7.11 6.11A7.996 7.996 0 0112 4c4.42 0 8 3.58 8 8s-3.58 8-8 8a7.996 7.996 0 01-5.39-2.11L4.71 19.8A9.936 9.936 0 0012 22a9.936 9.936 0 006.94-3.06L20 21v-6h-6l1.89 1.89z"/></svg></span> then
                  &quot;Add to Home Screen&quot;
                </>
              ) : (
                "Quick access to booking, pricing & support — right from your home screen."
              )}
            </p>
            <div className="flex gap-2">
              {deferredPrompt && !isIOS ? (
                <button
                  onClick={handleInstall}
                  className="text-sm font-bold text-white px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: "#e8740c",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  Install App
                </button>
              ) : (
                <button
                  onClick={handleDismiss}
                  className="text-sm font-bold text-white px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: "var(--primary)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  Got It
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="text-sm font-medium px-4 py-2 rounded-lg transition-all border"
                style={{
                  color: "var(--light-text)",
                  borderColor: "#e5e7eb",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
