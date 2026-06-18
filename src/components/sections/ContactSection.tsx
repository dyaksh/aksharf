'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  CheckCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  Linkedin,
  Facebook,
  MessageCircle,
  Building2,
  Clock,
  Shield,
  Globe,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

// Simple email regex for validation
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Accent confetti particle component - more celebratory
function AccentConfettiParticle({ delay, x, color, size, rotation }: { delay: number; x: number; color: string; size: number; rotation: number }) {
  const shapes = ['rounded-full', 'rounded-sm', 'rounded-none'];
  const shape = shapes[Math.floor(rotation) % 3];
  return (
    <motion.div
      className={`absolute ${shape}`}
      style={{
        backgroundColor: color,
        left: `${x}%`,
        top: '40%',
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0, scale: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.3],
        y: [0, -80, -180],
        x: [0, (Math.random() - 0.5) * 120],
        rotate: [0, rotation * 180],
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Stylized World Map SVG Component with highlighted China/Foshan
function WorldMapGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#5d2c86]/5 via-[#f8f3ed] to-[#9b6ec5]/5 dark:from-[#5d2c86]/10 dark:via-[#1E1E1E] dark:to-[#9b6ec5]/5 border border-gray-200 dark:border-gray-700">
      {/* Background grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="contact-map-grid"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#5d2c86" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-map-grid)" />
      </svg>

      {/* Stylized World Map */}
      <svg
        viewBox="0 0 600 350"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Continent shapes - simplified abstract representations */}
        {/* North America */}
        <path
          d="M 80 60 Q 100 40 140 45 Q 170 48 180 70 Q 185 90 175 110 Q 165 130 140 140 Q 120 145 100 135 Q 80 125 70 105 Q 60 85 80 60Z"
          fill="#5d2c86"
          opacity="0.08"
          className="dark:opacity-[0.12]"
        />
        {/* South America */}
        <path
          d="M 140 170 Q 155 160 165 175 Q 170 200 165 230 Q 160 255 145 270 Q 130 280 120 265 Q 115 240 120 210 Q 125 185 140 170Z"
          fill="#5d2c86"
          opacity="0.08"
          className="dark:opacity-[0.12]"
        />
        {/* Europe */}
        <path
          d="M 280 55 Q 300 45 320 50 Q 335 55 340 70 Q 338 85 325 90 Q 310 92 295 85 Q 280 78 275 65 Q 275 55 280 55Z"
          fill="#5d2c86"
          opacity="0.08"
          className="dark:opacity-[0.12]"
        />
        {/* Africa */}
        <path
          d="M 290 105 Q 310 95 330 100 Q 345 110 350 135 Q 348 165 335 190 Q 320 210 305 215 Q 290 210 280 190 Q 275 165 278 140 Q 280 120 290 105Z"
          fill="#5d2c86"
          opacity="0.08"
          className="dark:opacity-[0.12]"
        />
        {/* Asia - HIGHLIGHTED */}
        <path
          d="M 340 40 Q 370 30 410 35 Q 450 40 480 55 Q 510 70 520 95 Q 525 120 510 140 Q 490 155 460 160 Q 430 158 400 148 Q 375 138 355 120 Q 340 105 335 85 Q 332 65 340 40Z"
          fill="#5d2c86"
          opacity="0.15"
          className="dark:opacity-[0.25]"
          stroke="#5d2c86"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        {/* India subcontinent */}
        <path
          d="M 400 130 Q 415 125 420 140 Q 418 160 408 175 Q 398 185 390 178 Q 385 165 388 148 Q 392 135 400 130Z"
          fill="#5d2c86"
          opacity="0.12"
          className="dark:opacity-[0.2]"
        />
        {/* Southeast Asia */}
        <path
          d="M 460 150 Q 475 145 485 155 Q 490 170 483 182 Q 475 188 465 183 Q 458 172 460 150Z"
          fill="#5d2c86"
          opacity="0.1"
          className="dark:opacity-[0.16]"
        />
        {/* Australia */}
        <path
          d="M 480 220 Q 510 210 535 220 Q 548 235 540 255 Q 525 268 505 265 Q 485 260 478 245 Q 475 230 480 220Z"
          fill="#5d2c86"
          opacity="0.06"
          className="dark:opacity-[0.1]"
        />

        {/* China/Foshan highlighted area - pulsing glow */}
        <circle cx="445" cy="95" r="35" fill="#9b6ec5" opacity="0.06" />
        <circle cx="445" cy="95" r="20" fill="#9b6ec5" opacity="0.12" />
        <circle cx="445" cy="95" r="8" fill="#9b6ec5" opacity="0.4">
          <animate
            attributeName="r"
            values="8;12;8"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.2;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Foshan pin */}
        <g transform="translate(445, 85)">
          {/* Pin drop */}
          <path
            d="M 0 -12 C -5 -12 -8 -8 -8 -4 C -8 2 0 12 0 12 C 0 12 8 2 8 -4 C 8 -8 5 -12 0 -12Z"
            fill="#9b6ec5"
            opacity="0.9"
          />
          <circle cx="0" cy="-4" r="3" fill="white" opacity="0.9" />
        </g>

        {/* Connection lines from Foshan to other regions */}
        <line x1="445" y1="85" x2="130" y2="90" stroke="#9b6ec5" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="445" y1="85" x2="310" y2="65" stroke="#9b6ec5" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="445" y1="85" x2="510" y2="240" stroke="#9b6ec5" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite" />
        </line>

        {/* Small dots at connection endpoints */}
        <circle cx="130" cy="90" r="2" fill="#5d2c86" opacity="0.3" />
        <circle cx="310" cy="65" r="2" fill="#5d2c86" opacity="0.3" />
        <circle cx="510" cy="240" r="2" fill="#5d2c86" opacity="0.2" />
      </svg>

      {/* Overlay text */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-[#5d2c86] dark:text-[#7d44a8] font-sans-body flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Global Reach
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">
            Shipping from Foshan to 30+ countries
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-medium text-[#9b6ec5] font-sans-body">Foshan HQ</p>
          <p className="text-[9px] text-gray-400 dark:text-gray-500 font-sans-body">23.02°N, 113.12°E</p>
        </div>
      </div>

      {/* Purple-accent gradient accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5]" />
    </div>
  );
}

// Validation indicator component
function ValidationIndicator({ valid, touched, isEmpty }: { valid: boolean; touched: boolean; isEmpty: boolean }) {
  if (!touched || isEmpty) return null;
  return (
    <motion.div
      className="absolute right-2 top-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {valid ? (
        <Check className="w-4 h-4 text-[#5d2c86]" />
      ) : (
        <X className="w-4 h-4 text-red-400" />
      )}
    </motion.div>
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
    location: '',
    product: '',
    quantity: '',
    projectType: '',
    contactTime: '',
    message: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false,
    location: false,
    product: false,
    quantity: false,
    projectType: false,
    contactTime: false,
    message: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Accent confetti colors - more celebratory with accent dominance
  const confettiColors = ['#9b6ec5', '#F0C040', '#E5B830', '#5d2c86', '#7d44a8', '#8B5CF6', '#9b6ec5', '#F5D060'];
  const confettiParticles = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    delay: 0.2 + i * 0.04,
    x: 10 + Math.random() * 80,
    color: confettiColors[i % confettiColors.length],
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 4,
  })), []);

  // Form progress calculation
  const formProgress = useMemo(() => {
    let filled = 0;
    const total = 4; // name, email, projectType, message (required fields)
    if (formData.name.trim()) filled++;
    if (formData.email.trim() && isValidEmail(formData.email)) filled++;
    if (formData.projectType) filled++;
    if (formData.message.trim()) filled++;
    return { filled, total, percentage: (filled / total) * 100 };
  }, [formData]);

  // Auto-dismiss success overlay
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  useEffect(() => {
    if (formState === 'success') {
      setShowSuccessOverlay(true);
      const timer = setTimeout(() => {
        setShowSuccessOverlay(false);
        setFormState('idle');
      }, 3500);
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
        setFormData({ name: '', email: '', company: '', location: '', product: '', quantity: '', projectType: '', contactTime: '', message: '' });
        setTouched({ name: false, email: false, company: false, location: false, product: false, quantity: false, projectType: false, contactTime: false, message: false });
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
      value: '+1 (760) 617-0800',
      href: 'tel:+17606170800',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'yogin@aksharfoshan.com',
      href: 'mailto:yogin@aksharfoshan.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'No. 29, Sanling Road, Gaoming, Foshan',
      href: undefined,
    },
  ];

  // Quick contact sidebar items
  const quickContactItems = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+1 (760) 617-0800',
      href: 'tel:+17606170800',
      description: 'Available 24/7',
      color: 'text-[#5d2c86] dark:text-[#7d44a8]',
      bgColor: 'bg-[#5d2c86]/5 dark:bg-[#7d44a8]/10',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'yogin@aksharfoshan.com',
      href: 'mailto:yogin@aksharfoshan.com',
      description: 'Response within 24h',
      color: 'text-[#5d2c86] dark:text-[#7d44a8]',
      bgColor: 'bg-[#5d2c86]/5 dark:bg-[#7d44a8]/10',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+1 (760) 617-0800',
      href: 'https://wa.me/17606170800',
      description: 'Chat with us',
      color: 'text-[#5d2c86] dark:text-[#7d44a8]',
      bgColor: 'bg-[#5d2c86]/5 dark:bg-[#7d44a8]/10',
    },
  ];

  return (
    <section id="contact" className="bg-[#f8f3ed] dark:bg-[#1A1A1A] py-20 lg:py-32 relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Decorative elements with parallax */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(93,44,134,0.03) 0%, transparent 70%)',
          y: parallaxY1,
        }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(125,68,168,0.03) 0%, transparent 70%)',
          y: parallaxY2,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left - Map & Contact Info */}
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
              <span className="text-[#5d2c86] dark:text-[#7d44a8]">conversation</span>.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mb-8">
              Whether you have a project in mind or simply want to explore
              possibilities, our team is ready to listen. Share your details and
              we&apos;ll respond within one business day.
            </p>

            {/* Stylized World Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <WorldMapGraphic />
            </motion.div>

            {/* Contact Info Cards with accent left border */}
            <div className="space-y-3 mt-6">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href || '#'}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md border-l-[3px] border-l-[#9b6ec5] hover:border-l-[#5d2c86] dark:border-l-[#9b6ec5] dark:hover:border-l-[#7d44a8] transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#9b6ec5]/5 dark:bg-[#9b6ec5]/10 flex items-center justify-center group-hover:bg-[#9b6ec5]/10 dark:group-hover:bg-[#9b6ec5]/20 transition-colors duration-300 shrink-0">
                      <Icon className="w-5 h-5 text-[#9b6ec5] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-sans-body">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-[#1A1A1A] dark:text-white font-sans-body group-hover:text-[#5d2c86] dark:group-hover:text-[#7d44a8] transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Business Hours */}
            <motion.div
              className="mt-4 p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 border-l-[3px] border-l-[#5d2c86] dark:border-l-[#7d44a8]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#5d2c86]/5 dark:bg-[#7d44a8]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#5d2c86] dark:text-[#7d44a8]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-sans-body">Business Hours</p>
                  <p className="text-sm font-medium text-[#1A1A1A] dark:text-white font-sans-body">
                    Mon–Sat: 9:00 AM – 6:00 PM (CST)
                  </p>
                </div>
              </div>
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
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-[#5d2c86] hover:border-[#5d2c86] hover:text-white text-gray-500 dark:text-gray-400 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-[#5d2c86] hover:border-[#5d2c86] hover:text-white text-gray-500 dark:text-gray-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Form + Quick Contact Sidebar */}
          <motion.div
            className="lg:w-7/12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="flex flex-col xl:flex-row gap-6">
              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-shadow duration-500 hover:shadow-xl relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5]" />

                {/* Form Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-sans-body">
                      Form Progress
                    </span>
                    <span className="text-xs font-medium font-sans-body" style={{ color: formProgress.percentage === 100 ? '#22c55e' : formProgress.percentage >= 50 ? '#9b6ec5' : '#9ca3af' }}>
                      {formProgress.filled}/{formProgress.total} fields
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: formProgress.percentage === 100
                          ? 'linear-gradient(to right, #22c55e, #16a34a)'
                          : 'linear-gradient(to right, #5d2c86, #9b6ec5)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${formProgress.percentage}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>

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
                      {/* Accent confetti particles */}
                      {confettiParticles.map((particle) => (
                        <AccentConfettiParticle
                          key={particle.id}
                          delay={particle.delay}
                          x={particle.x}
                          color={particle.color}
                          size={particle.size}
                          rotation={particle.rotation}
                        />
                      ))}

                      {/* Accent sparkle ring */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                          delay: 0.1,
                        }}
                        className="relative mb-6"
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9b6ec5]/20 to-[#F0C040]/10 flex items-center justify-center ring-2 ring-[#9b6ec5]/30">
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
                            <CheckCircle className="w-12 h-12 text-[#9b6ec5]" />
                          </motion.div>
                        </div>
                        {/* Sparkle decorations */}
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        >
                          <Sparkles className="w-4 h-4 text-[#9b6ec5]" />
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-1 -left-1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <Sparkles className="w-3 h-3 text-[#5d2c86]" />
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
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                      Your Name <span className="text-red-400">*</span>
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
                        className="rounded-xl font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)]"
                        placeholder="John Smith"
                      />
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                      </div>
                      <ValidationIndicator
                        valid={formData.name.trim().length > 0}
                        touched={touched.name}
                        isEmpty={!formData.name.trim()}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                      Email <span className="text-red-400">*</span>
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
                        className={`rounded-xl font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)] ${
                          touched.email && formData.email && !isValidEmail(formData.email)
                            ? 'border-red-300 dark:border-red-500/50 focus-visible:ring-red-200 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                            : ''
                        }`}
                        placeholder="john@hotelbrand.com"
                      />
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                      </div>
                      <ValidationIndicator
                        valid={isValidEmail(formData.email)}
                        touched={touched.email}
                        isEmpty={!formData.email.trim()}
                      />
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
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                    Company or Hotel Name
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
                      className="rounded-xl font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)]"
                      placeholder="Hilton, Marriott, IHG..."
                    />
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                    <ValidationIndicator
                      valid={formData.company.trim().length > 0}
                      touched={touched.company}
                      isEmpty={!formData.company.trim()}
                    />
                  </div>
                </div>

                {/* Project Location + Product Requirement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Project Location Field */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                      Project Location
                    </label>
                    <div className="relative">
                      <Input
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        onBlur={() =>
                          setTouched({ ...touched, location: true })
                        }
                        className="rounded-xl font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)]"
                        placeholder="City, Country"
                      />
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                      </div>
                      <ValidationIndicator
                        valid={formData.location.trim().length > 0}
                        touched={touched.location}
                        isEmpty={!formData.location.trim()}
                      />
                    </div>
                  </div>

                  {/* Product Requirement Field */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                      Product Requirement
                    </label>
                    <div className="relative">
                      <Input
                        value={formData.product}
                        onChange={(e) =>
                          setFormData({ ...formData, product: e.target.value })
                        }
                        onBlur={() =>
                          setTouched({ ...touched, product: true })
                        }
                        className="rounded-xl font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)]"
                        placeholder="e.g. Furniture, Lighting, Decor"
                      />
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                      </div>
                      <ValidationIndicator
                        valid={formData.product.trim().length > 0}
                        touched={touched.product}
                        isEmpty={!formData.product.trim()}
                      />
                    </div>
                  </div>
                </div>

                {/* Approximate Quantity or Scope Field */}
                <div className="mb-4 relative group">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                    Approximate Quantity or Scope
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      onBlur={() =>
                        setTouched({ ...touched, quantity: true })
                      }
                      className="rounded-xl font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)]"
                      placeholder="e.g. 200 rooms, 50 suites, Full hotel FF&E"
                    />
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                    <ValidationIndicator
                      valid={formData.quantity.trim().length > 0}
                      touched={touched.quantity}
                      isEmpty={!formData.quantity.trim()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Project Type Dropdown */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => {
                          setFormData({ ...formData, projectType: value });
                          setTouched({ ...touched, projectType: true });
                        }}
                      >
                        <SelectTrigger className="w-full rounded-xl font-sans-body h-10 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus:ring-[#9b6ec5]/40 focus:border-[#9b6ec5]/60 dark:focus:ring-[#9b6ec5]/30 dark:focus:border-[#9b6ec5]/50 transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
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
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Contact Time Dropdown */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                      Preferred Contact Time
                    </label>
                    <div className="relative">
                      <Select
                        value={formData.contactTime}
                        onValueChange={(value) => {
                          setFormData({ ...formData, contactTime: value });
                          setTouched({ ...touched, contactTime: true });
                        }}
                      >
                        <SelectTrigger className="w-full rounded-xl font-sans-body h-10 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus:ring-[#9b6ec5]/40 focus:border-[#9b6ec5]/60 dark:focus:ring-[#9b6ec5]/30 dark:focus:border-[#9b6ec5]/50 transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                            <SelectValue placeholder="Select time..." />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="mb-6 relative group">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-sans-body transition-colors group-focus-within:text-[#5d2c86] dark:group-focus-within:text-[#7d44a8]">
                    Project Requirement <span className="text-red-400">*</span>
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
                      className="rounded-xl min-h-[120px] font-sans-body pr-8 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/60 dark:focus-visible:ring-[#9b6ec5]/30 dark:focus-visible:border-[#9b6ec5]/50 transition-all duration-300 shadow-[0_0_0_0_rgba(125,68,168,0)] focus-visible:shadow-[0_0_0_3px_rgba(125,68,168,0.15)]"
                      placeholder="Tell us about your project — property type, number of keys, timeline..."
                    />
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86] to-[#9b6ec5] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                    <ValidationIndicator
                      valid={formData.message.trim().length > 0}
                      touched={touched.message}
                      isEmpty={!formData.message.trim()}
                    />
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

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full btn-shimmer bg-[#5d2c86] hover:bg-[#7d44a8] text-white rounded-xl py-6 font-sans-body text-sm font-medium transition-all duration-300"
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
                        Send Inquiry →
                      </>
                    )}
                  </Button>

                  {/* Response time badge */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="inline-flex items-center gap-1.5 bg-[#9b6ec5]/10 dark:bg-[#9b6ec5]/15 px-3 py-1.5 rounded-full">
                      <Clock className="w-3 h-3 text-[#9b6ec5]" />
                      <span className="text-[10px] font-medium text-[#9b6ec5] font-sans-body">
                        Typical response time: Within 24 hours
                      </span>
                    </div>
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-center justify-center gap-1.5">
                    <Shield className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body text-center">
                      Your information is secure and will never be shared.
                    </p>
                  </div>
                </div>
              </form>

              {/* Quick Contact Sidebar - visible on xl screens */}
              <motion.div
                className="hidden xl:flex flex-col gap-3 w-52 shrink-0"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 font-sans-body font-bold mb-1">
                  QUICK CONTACT
                </p>
                {quickContactItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group p-3 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">
                            {item.label}
                          </p>
                          <p className="text-xs font-medium text-[#1A1A1A] dark:text-white font-sans-body truncate group-hover:text-[#5d2c86] dark:group-hover:text-[#7d44a8] transition-colors duration-300">
                            {item.value}
                          </p>
                          <p className="text-[9px] text-gray-300 dark:text-gray-600 font-sans-body mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}

                {/* Business hours card in sidebar */}
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-[#5d2c86]/5 to-[#9b6ec5]/5 dark:from-[#5d2c86]/10 dark:to-[#9b6ec5]/5 border border-gray-100 dark:border-gray-800 mt-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#5d2c86] dark:text-[#7d44a8]" />
                    <p className="text-[10px] font-bold text-[#5d2c86] dark:text-[#7d44a8] font-sans-body tracking-wider">
                      HOURS
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">Mon–Fri</span>
                      <span className="text-[10px] font-medium text-[#1A1A1A] dark:text-gray-300 font-sans-body">9AM–6PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">Saturday</span>
                      <span className="text-[10px] font-medium text-[#1A1A1A] dark:text-gray-300 font-sans-body">9AM–1PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">Sunday</span>
                      <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 font-sans-body">Closed</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-300 dark:text-gray-600 font-sans-body mt-2">
                    China Standard Time (UTC+8)
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Quick Contact Mobile - visible below xl screens */}
            <motion.div
              className="xl:hidden grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {quickContactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group p-3 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer text-center"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                  >
                    <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body">
                      {item.label}
                    </p>
                    <p className="text-xs font-medium text-[#1A1A1A] dark:text-white font-sans-body truncate group-hover:text-[#5d2c86] dark:group-hover:text-[#7d44a8] transition-colors duration-300">
                      {item.value}
                    </p>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
