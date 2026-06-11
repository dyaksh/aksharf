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

/* Small inline SVG icons for WhatsApp and WeChat to avoid extra deps */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 01-.235-1.676c0-3.793 3.527-6.87 7.879-6.87.243 0 .482.012.718.031C17.084 4.635 13.227 2.188 8.691 2.188zm-2.5 4.39c.58 0 1.049.47 1.049 1.05s-.47 1.05-1.049 1.05c-.58 0-1.051-.47-1.051-1.05s.47-1.05 1.051-1.05zm5.038 0c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05c-.58 0-1.05-.47-1.05-1.05s.47-1.05 1.05-1.05zm5.147 4.127c-3.846 0-6.968 2.725-6.968 6.085 0 3.36 3.122 6.085 6.968 6.085.697 0 1.37-.096 2-.261a.717.717 0 01.596.081l1.389.813a.27.27 0 00.138.047c.132 0 .24-.11.24-.245 0-.06-.024-.118-.04-.175l-.285-1.08a.49.49 0 01.177-.552C22.096 20.28 23 18.71 23 16.895c0-3.36-3.122-6.19-6.624-6.19zm-2.2 3.39c.48 0 .869.39.869.87s-.39.87-.869.87c-.48 0-.87-.39-.87-.87s.39-.87.87-.87zm4.398 0c.48 0 .87.39.87.87s-.39.87-.87.87c-.48 0-.87-.39-.87-.87s.39-.87.87-.87z" />
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
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

  // Auto-dismiss tooltip after 5 seconds
  useEffect(() => {
    if (!showTooltip || isOpen) return;
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [showTooltip, isOpen]);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

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
              <div className="flex items-center gap-1.5">
                {/* WhatsApp quick-action button in header */}
                <a
                  href="https://wa.me/8618666422531"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="Chat on WhatsApp"
                  className="w-7 h-7 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 flex items-center justify-center transition-colors relative"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  {/* Small green dot indicator */}
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25D366] border border-[#4A2364]" />
                </a>

                {/* WeChat quick-action button in header */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      aria-label="Add WeChat"
                      title="Add WeChat"
                      className="w-7 h-7 rounded-full bg-[#07C160]/20 hover:bg-[#07C160]/30 flex items-center justify-center transition-colors relative"
                    >
                      <WeChatIcon className="w-3.5 h-3.5 text-white" />
                      {/* Small green dot indicator */}
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#07C160] border border-[#4A2364]" />
                    </button>
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

                {/* Subtle divider */}
                <div className="w-px h-4 bg-white/20 mx-0.5" />

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
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

                  {/* Footer: Or reach us on WhatsApp / WeChat */}
                  <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body text-center mb-2">
                      Or reach us on
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href="https://wa.me/8618666422531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] text-[#25D366] hover:text-[#20BD5A] font-sans-body font-medium transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className="flex items-center gap-1.5 text-[11px] text-[#07C160] hover:text-[#06AD56] font-sans-body font-medium transition-colors"
                          >
                            <WeChatIcon className="w-3.5 h-3.5" />
                            WeChat
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          side="top"
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
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand-styled tooltip for main chat button */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-16 bottom-3 bg-[#4A2364] text-white px-3 py-1.5 rounded-lg text-xs font-sans-body font-medium shadow-lg whitespace-nowrap pointer-events-none"
          >
            Chat with us
            {/* Gold arrow pointing right */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#D4AF37]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Floating Main Chat Button */}
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
