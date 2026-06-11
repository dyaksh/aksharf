'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Send,
  CheckCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Check,
  MapPinIcon,
  Linkedin,
  Facebook,
  MessageCircle,
  Building2,
} from 'lucide-react';

// Simple email regex for validation
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Confetti particle component
function ConfettiParticle({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        left: `${x}%`,
        top: '50%',
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        y: [0, -60, -120],
        x: [0, (Math.random() - 0.5) * 80],
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>(
    'idle'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false,
    projectType: false,
    message: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Confetti colors
  const confettiColors = ['#D4AF37', '#4A2364', '#6B3F8E', '#F0C040', '#8B5CF6', '#E5B830'];
  const confettiParticles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    delay: 0.3 + i * 0.05,
    x: 20 + Math.random() * 60,
    color: confettiColors[i % confettiColors.length],
  }));

  // Auto-dismiss success overlay
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  useEffect(() => {
    if (formState === 'success') {
      setShowSuccessOverlay(true);
      const timer = setTimeout(() => {
        setShowSuccessOverlay(false);
        setFormState('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
        setTouched({ name: false, email: false, company: false, projectType: false, message: false });
      }
    } catch {
      setFormState('idle');
    }
  };

  const charCount = formData.message.length;
  const maxChars = 500;

  const contactItems = [
    {
      icon: Phone,
      label: 'Phone',
      value: '18666422531',
      href: 'tel:18666422531',
    },
    {
      icon: Mail,
      label: 'Email',
      value: '250552975@qq.com',
      href: 'mailto:250552975@qq.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'No. 29, Sanling Road, Gaoming, Foshan',
      href: undefined,
    },
  ];

  return (
    <section className="bg-[#F8F5F2] dark:bg-[#1A1A1A] py-20 lg:py-32 relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Decorative elements */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,35,100,0.03) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <motion.div
            className="lg:w-5/12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4 font-sans-body">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-6">
              Let&apos;s start a{' '}
              <span className="text-[#4A2364] dark:text-[#6B3F8E]">conversation</span>.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mb-8">
              Whether you have a project in mind or simply want to explore
              possibilities, our team is ready to listen. Share your details and
              we&apos;ll respond within one business day.
            </p>

            {/* Contact Info Cards with hover effects */}
            <div className="space-y-4 mb-8">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href || '#'}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#4A2364]/20 dark:hover:border-[#6B3F8E]/20 transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#4A2364]/5 flex items-center justify-center group-hover:bg-[#4A2364]/10 transition-colors duration-300 shrink-0">
                      <Icon className="w-5 h-5 text-[#4A2364] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-sans-body">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-[#1A1A1A] dark:text-white font-sans-body group-hover:text-[#4A2364] dark:group-hover:text-[#6B3F8E] transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 h-36 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Grid pattern for map feel */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.1 }}
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="map-grid"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#4A2364"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-8 h-8 text-[#4A2364]/60 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#4A2364] font-sans-body">
                    Foshan, China
                  </p>
                  <p className="text-xs text-gray-400 font-sans-body">
                    Gaoming District
                  </p>
                </div>
              </div>
              {/* Purple accent at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A2364] to-[#D4AF37]" />
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              className="flex items-center gap-4 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="text-xs text-gray-400 font-sans-body mr-2">
                Follow us
              </span>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-[#4A2364] hover:border-[#4A2364] hover:text-white text-gray-500 dark:text-gray-400 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-[#4A2364] hover:border-[#4A2364] hover:text-white text-gray-500 dark:text-gray-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-[#4A2364] hover:border-[#4A2364] hover:text-white text-gray-500 dark:text-gray-400 transition-all duration-300"
                aria-label="WeChat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="lg:w-7/12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-shadow duration-500 hover:shadow-xl relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A2364] to-[#D4AF37]" />

              {/* Success Overlay */}
              <AnimatePresence>
                {showSuccessOverlay && (
                  <motion.div
                    className="absolute inset-0 z-10 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Confetti particles */}
                    {confettiParticles.map((particle) => (
                      <ConfettiParticle
                        key={particle.id}
                        delay={particle.delay}
                        x={particle.x}
                        color={particle.color}
                      />
                    ))}

                    {/* Green checkmark with spring animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: 0.25,
                        }}
                      >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </motion.div>
                    </motion.div>

                    {/* Thank you heading */}
                    <motion.h3
                      className="text-2xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      Thank you!
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400 font-sans-body"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.4 }}
                    >
                      We&apos;ll get back to you within 24 hours
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name Field */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#4A2364] dark:group-focus-within:text-[#6B3F8E]">
                    Your Name
                  </label>
                  <div className="relative">
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onBlur={() =>
                        setTouched({ ...touched, name: true })
                      }
                      className="rounded-xl font-sans-body pr-8"
                      placeholder="John Smith"
                    />
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4A2364] to-[#D4AF37] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                    {touched.name && formData.name.trim() && (
                      <motion.div
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#4A2364] dark:group-focus-within:text-[#6B3F8E]">
                    Email
                  </label>
                  <div className="relative">
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onBlur={() =>
                        setTouched({ ...touched, email: true })
                      }
                      className={`rounded-xl font-sans-body pr-8 ${
                        touched.email && formData.email && !isValidEmail(formData.email)
                          ? 'border-red-300 focus-visible:ring-red-200'
                          : ''
                      }`}
                      placeholder="john@hotelbrand.com"
                    />
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4A2364] to-[#D4AF37] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                    {touched.email && isValidEmail(formData.email) && (
                      <motion.div
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                    {touched.email &&
                      formData.email &&
                      !isValidEmail(formData.email) && (
                        <motion.p
                          className="text-[10px] text-red-400 mt-1 font-sans-body"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Please enter a valid email address
                        </motion.p>
                      )}
                  </div>
                </div>
              </div>

              {/* Company Field */}
              <div className="mb-4 relative group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#4A2364] dark:group-focus-within:text-[#6B3F8E]">
                  Company / Property
                </label>
                <div className="relative">
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    onBlur={() =>
                      setTouched({ ...touched, company: true })
                    }
                    className="rounded-xl font-sans-body pr-8"
                    placeholder="Hilton, Marriott, IHG..."
                  />
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A2364] to-[#D4AF37] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>
                  {touched.company && formData.company.trim() && (
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Project Type Dropdown */}
              <div className="mb-4 relative group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#4A2364] dark:group-focus-within:text-[#6B3F8E]">
                  Project Type
                </label>
                <div className="relative">
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => {
                      setFormData({ ...formData, projectType: value });
                      setTouched({ ...touched, projectType: true });
                    }}
                  >
                    <SelectTrigger className="w-full rounded-xl font-sans-body h-9">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                        <SelectValue placeholder="Select project type..." />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="new-build">New Build</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                      <SelectItem value="brand-conversion">Brand Conversion</SelectItem>
                      <SelectItem value="ffe-replacement">FF&amp;E Replacement</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A2364] to-[#D4AF37] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="mb-6 relative group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#4A2364] dark:group-focus-within:text-[#6B3F8E]">
                  Message
                </label>
                <div className="relative">
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onBlur={() =>
                      setTouched({ ...touched, message: true })
                    }
                    maxLength={maxChars}
                    className="rounded-xl min-h-[120px] font-sans-body pr-8"
                    placeholder="Tell us about your project — property type, number of keys, timeline..."
                  />
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A2364] to-[#D4AF37] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>
                  {touched.message && formData.message.trim() && (
                    <motion.div
                      className="absolute right-2 top-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </motion.div>
                  )}
                </div>
                {/* Character counter */}
                <div className="flex justify-end mt-1.5">
                  <span
                    className={`text-[10px] font-sans-body transition-colors duration-200 ${
                      charCount >= 450
                        ? charCount >= maxChars
                          ? 'text-red-500 font-medium'
                          : 'text-orange-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {charCount}/{maxChars} characters
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full btn-shimmer bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-xl py-6 font-sans-body text-sm font-medium transition-all duration-300"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : formState === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
