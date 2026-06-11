'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Pulse animation: 3 pulses then stop
  useEffect(() => {
    if (pulseCount >= 3 || isOpen) return;
    const timer = setTimeout(() => {
      setPulseCount((prev) => prev + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [pulseCount, isOpen]);

  // Close panel when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (_err) {
      // Silently handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 250, damping: 20 }}
            className="w-80 sm:w-96 bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#4A2364] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-sans-body">Quick Contact</h3>
                  <p className="text-[10px] text-white/60 font-sans-body">We typically reply within 24 hours</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-5">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-1">
                    Message Sent!
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans-body">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="chat-name" className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 font-sans-body mb-1">
                      Name
                    </label>
                    <input
                      id="chat-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-white/30 font-sans-body focus:outline-none focus:ring-2 focus:ring-[#4A2364]/40 focus:border-[#4A2364] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="chat-email" className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 font-sans-body mb-1">
                      Email
                    </label>
                    <input
                      id="chat-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-white/30 font-sans-body focus:outline-none focus:ring-2 focus:ring-[#4A2364]/40 focus:border-[#4A2364] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="chat-message" className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 font-sans-body mb-1">
                      Message
                    </label>
                    <textarea
                      id="chat-message"
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="How can we help you?"
                      required
                      rows={3}
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-white/30 font-sans-body focus:outline-none focus:ring-2 focus:ring-[#4A2364]/40 focus:border-[#4A2364] transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.name || !form.email || !form.message}
                    className="w-full bg-[#4A2364] hover:bg-[#6B3F8E] text-white font-sans-body text-sm font-medium rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WeChat Button - Top position */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Popover>
          <PopoverTrigger asChild>
            <motion.button
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#07C160] hover:bg-[#06AD56] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Add WeChat"
              title="Add WeChat"
            >
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />

              {/* Pulse rings */}
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-[#07C160]"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: 2,
                  repeatDelay: 1,
                  delay: 1.4,
                }}
              />
            </motion.button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="w-auto bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-xl rounded-xl p-4"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#07C160]/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#07C160]" />
              </div>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white font-sans-body">
                Add WeChat
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans-body font-mono bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-md select-all">
                18666422531
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">
                Scan or search to add
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>

      {/* WhatsApp Button - Middle position */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <a
          href="https://wa.me/8618666422531"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <motion.button
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />

            {/* Pulse rings */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#25D366]"
              animate={{
                scale: [1, 1.6],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: 2,
                repeatDelay: 1,
                delay: 1.2,
              }}
            />
          </motion.button>
        </a>
      </motion.div>

      {/* Tooltip for main chat button */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 bottom-0 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-3 py-1.5 rounded-lg text-xs font-sans-body font-medium shadow-lg whitespace-nowrap pointer-events-none"
        >
          Chat with us
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#1A1A1A] dark:border-l-white" />
        </motion.div>
      )}

      {/* Floating Main Chat Button - Bottom position */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-[#4A2364] hover:bg-[#6B3F8E] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse rings */}
        {!isOpen && pulseCount < 3 && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#4A2364]"
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: 2,
                repeatDelay: 0.8,
              }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
              animate={{
                scale: [1, 2],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: 2,
                repeatDelay: 0.8,
                delay: 0.3,
              }}
            />
          </>
        )}
      </motion.button>
    </div>
  );
}
