'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Factory, Globe, Clock, ShieldCheck, KeyRound, Package } from 'lucide-react';

// Count-up animation hook
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return { count, ref };
}

const stats = [
  { icon: Factory, value: 13, suffix: '+', label: 'Cooperating Facilities' },
  { icon: Globe, value: 5, suffix: '+', label: 'Countries Served' },
  { icon: KeyRound, value: 240, suffix: '+', label: 'Keys Delivered' },
  { icon: Clock, value: 21, suffix: ' days', label: 'Average Lead Time' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'Inspection Rate' },
  { icon: Package, value: 360, suffix: '°', label: 'FF&E Coverage' },
];

function StatItem({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2200);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-4 px-8 lg:px-12 shrink-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#D4AF37]" />
      </div>
      <div>
        <p className="text-2xl lg:text-3xl font-bold font-serif-display text-white">
          {count}
          <span className="text-[#D4AF37]">{stat.suffix}</span>
        </p>
        <p className="text-[10px] tracking-widest text-white/50 font-sans-body uppercase">
          {stat.label}
        </p>
      </div>
      {/* Separator dot */}
      {index < stats.length - 1 && (
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 ml-8 lg:ml-12" />
      )}
    </motion.div>
  );
}

export default function StatsTicker() {
  return (
    <section className="relative bg-[#1A1A1A] py-8 lg:py-10 overflow-hidden">
      {/* Gradient edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1A1A1A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1A1A1A] to-transparent z-10 pointer-events-none" />

      {/* Subtle gold top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      {/* Scrolling ticker container */}
      <div className="flex items-center">
        {/* Duplicate for seamless loop */}
        <div className="flex items-center animate-[marquee-scroll-left_40s_linear_infinite]">
          {[...stats, ...stats, ...stats, ...stats].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-4 px-8 lg:px-12 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-bold font-serif-display text-white">
                    {stat.value}
                    <span className="text-[#D4AF37]">{stat.suffix}</span>
                  </p>
                  <p className="text-[10px] tracking-widest text-white/50 font-sans-body uppercase">
                    {stat.label}
                  </p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 ml-8 lg:ml-12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
