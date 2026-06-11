'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooth spring-based progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Fade out when at the top
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  // Reactive glow — transform progress into a box-shadow string
  const boxShadow = useTransform(scrollYProgress, [0.02, 0.5, 1], [
    '0 0 6px rgba(212,175,55,0.2), 0 1px 3px rgba(93,44,134,0.2)',
    '0 0 12px rgba(212,175,55,0.4), 0 1px 4px rgba(93,44,134,0.3)',
    '0 0 16px rgba(212,175,55,0.6), 0 2px 6px rgba(93,44,134,0.4)',
  ]);

  return (
    <>
      {/* Background track — barely visible */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[3px]"
        style={{ opacity, backgroundColor: 'rgba(93,44,134,0.08)' }}
        aria-hidden="true"
      />

      {/* Gold gradient progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left"
        style={{
          scaleX: smoothProgress,
          opacity,
          background: 'linear-gradient(90deg, #5d2c86 0%, #7d44a8 25%, #D4AF37 70%, #E8CC6E 100%)',
          boxShadow,
        }}
      >
        {/* Leading edge bright dot */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E8CC6E]"
          style={{
            boxShadow: '0 0 8px rgba(212,175,55,0.8), 0 0 16px rgba(212,175,55,0.4)',
            opacity,
          }}
        />
      </motion.div>
    </>
  );
}
