'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';

const STORAGE_KEY = 'akshar-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    // Show banner after 3 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-24 sm:bottom-6 z-[90] flex justify-center p-4 sm:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-r from-[#1A1A1A] to-[#2D1B42] backdrop-blur-xl shadow-2xl p-5 md:p-6">
            {/* Gold top border accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Cookie icon */}
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-[#D4AF37]" />
              </div>

              {/* Text */}
              <div className="flex-1 pr-6 sm:pr-0">
                <p className="text-sm text-white leading-relaxed">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
                  <a href="/privacy-policy" className="text-[#D4AF37] hover:text-[#D4AF37]/80 underline underline-offset-2 transition-colors">Privacy Policy</a>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="flex-1 sm:flex-initial px-5 py-2.5 min-h-12 rounded-full border border-white/50 hover:border-white/70 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-initial px-5 py-2.5 min-h-12 rounded-full bg-[#5d2c86] hover:bg-[#7d44a8] text-white text-sm font-medium transition-colors shadow-lg"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
