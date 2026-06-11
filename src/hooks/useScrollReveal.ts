'use client';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollReveal(options?: { threshold?: number; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: options?.margin || '-80px',
    amount: options?.threshold || 0.2,
  });
  return { ref, isInView };
}
