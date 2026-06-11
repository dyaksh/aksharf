'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
} from 'lucide-react';

// Simple email regex for validation
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>(
    'idle'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false,
    message: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

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
        setFormData({ name: '', email: '', company: '', message: '' });
        setTouched({ name: false, email: false, company: false, message: false });
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch {
      setFormState('idle');
    }
  };

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
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
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
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
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
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

              {/* Message Field */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
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
                    className="rounded-xl min-h-[120px] font-sans-body pr-8"
                    placeholder="Tell us about your project — property type, number of keys, timeline..."
                  />
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
              </div>

              <Button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-xl py-6 font-sans-body text-sm font-medium transition-all duration-300"
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
