'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Floating particle component for decorative background
function FloatingParticle({
  delay,
  duration,
  x,
  y,
  size,
}: {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background:
          size > 6
            ? 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  // Parallax-like subtle movement on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Generate particles once
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: i * 0.4,
        duration: 4 + (i % 3) * 2,
        x: `${(i * 8.3) % 100}%`,
        y: `${20 + ((i * 17) % 60)}%`,
        size: 4 + (i % 4) * 3,
      })),
    []
  );

  return (
    <section
      className="relative bg-gradient-to-r from-[#1A1A1A] via-[#2D1B42] to-[#5d2c86] py-20 lg:py-32 overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-follow spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212,175,55,0.06), transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* Animated border/outline effect around section */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <div
          className="absolute inset-3 sm:inset-5 lg:inset-8 rounded-2xl border border-white/[0.06]"
        />
        <motion.div
          className="absolute inset-3 sm:inset-5 lg:inset-8 rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(212,175,55,0.15), transparent, rgba(93,44,134,0.15), transparent)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="absolute sm:left-[22px] sm:right-[22px] sm:top-[22px] sm:bottom-[22px] left-[14px] right-[14px] top-[14px] bottom-[14px] lg:left-[34px] lg:right-[34px] lg:top-[34px] lg:bottom-[34px] rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#2D1B42] to-[#5d2c86]"
        />
      </div>

      {/* Dot grid texture overlay at very low opacity */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="cta-dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      {/* Gradient blurred background blobs with parallax */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-[#5d2c86]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        style={{ y: backgroundY }}
      />

      {/* Floating decorative particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* Decorative geometric shapes */}
      <motion.div
        className="absolute top-10 right-[15%] w-20 h-20 border border-white/5 rounded-lg rotate-45 pointer-events-none"
        animate={{ rotate: [45, 90, 45] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-16 left-[10%] w-14 h-14 border border-[#D4AF37]/10 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Decorative gold line separator */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] mx-3" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.3em] text-[#D4AF37] mb-6 font-sans-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          NEXT CHAPTER
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl lg:text-6xl font-bold font-serif-display text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tell us about the property.
        </motion.h2>

        <motion.h3
          className="text-3xl sm:text-4xl lg:text-6xl font-bold font-serif-display text-[#D4AF37] italic mb-8 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span
            className="relative inline-block animate-[goldGlow_3s_ease-in-out_infinite]"
            style={{
              textShadow: '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)',
            }}
          >
            We&apos;ll script the FF&amp;E.
          </span>
        </motion.h3>

        <motion.p
          className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl mx-auto mb-10 font-sans-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Share your floor plans, brand standards or a moodboard. We&apos;ll come
          back with a scope, a budget envelope and a sample plan within five
          working days.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Primary button with glow/shimmer effect */}
          <div className="relative group">
            {/* Glow effect behind button */}
            <div className="absolute -inset-1 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/20 rounded-full blur-md transition-all duration-500" />
            <Button
              onClick={() => {
                window.location.hash = 'contact';
              }}
              className="relative btn-shimmer bg-white text-[#5d2c86] hover:bg-white/90 rounded-full px-8 py-6 font-sans-body text-sm font-medium group/btn overflow-hidden"
            >
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </span>
              <span className="relative flex items-center">
                Start a project
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>

          {/* Secondary button with glow/shimmer */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/0 group-hover:bg-white/10 rounded-full blur-md transition-all duration-500" />
            <Button
              variant="outline"
              className="relative border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 font-sans-body text-sm font-medium overflow-hidden group/btn"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
              <span className="relative">Get a Quote</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Inline keyframes for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes goldGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1);
          }
          50% {
            text-shadow: 0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.2), 0 0 80px rgba(212,175,55,0.1);
          }
        }
      `}</style>
    </section>
  );
}
