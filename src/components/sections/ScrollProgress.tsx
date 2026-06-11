'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hide the bar when at the very top of the page
  const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);

  return (
    <>
      {/* Subtle background track */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gray-200/40 dark:bg-gray-700/30"
        style={{ opacity }}
        aria-hidden="true"
      />

      {/* Animated progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
        style={{
          scaleX,
          opacity,
          background: 'linear-gradient(90deg, #4A2364, #D4AF37)',
          boxShadow:
            '0 0 8px rgba(74,35,100,0.4), 0 0 4px rgba(212,175,55,0.3)',
        }}
      />
    </>
  );
}
