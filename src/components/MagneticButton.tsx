'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button, type buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magneticStrength?: number; // max px shift toward cursor
  glowColor?: string;
}

export default function MagneticButton({
  children,
  className,
  magneticStrength = 8,
  glowColor = 'rgba(212,175,55,0.25)',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for x/y offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config for smooth magnetic pull
  const springConfig = { stiffness: 200, damping: 15, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance from cursor to center, clamped to magneticStrength
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    x.set(deltaX * magneticStrength);
    y.set(deltaY * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect behind the button */}
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />

      <Button
        className={cn('relative z-10', className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
