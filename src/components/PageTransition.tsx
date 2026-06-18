'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useCallback, useRef, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

/**
 * Cinematic page transition overlay.
 * When pageKey changes, a dark overlay with gold streak sweeps in,
 * content swaps, then overlay sweeps out.
 */
export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  // The key currently being displayed
  const [displayKey, setDisplayKey] = useState(pageKey);
  // The children currently being displayed
  const [displayChildren, setDisplayChildren] = useState(children);
  // Whether the overlay is in its "exit" phase (sliding out to the left)
  const [isExiting, setIsExiting] = useState(false);
  // Keep a ref to the latest children so callbacks always read fresh value
  const childrenRef = useRef(children);
  childrenRef.current = children;

  // Derived: do we need a transition?
  const needsTransition = pageKey !== displayKey;

  // When overlay enter animation completes, swap content and start exit
  const handleEnterComplete = useCallback(() => {
    setDisplayKey(pageKey);
    setDisplayChildren(childrenRef.current);
    setIsExiting(true);
  }, [pageKey]);

  // When overlay exit animation completes, clean up
  const handleExitComplete = useCallback(() => {
    setIsExiting(false);
  }, []);

  // Sync: if pageKey changed but no transition played (e.g. initial render),
  // ensure displayChildren stays in sync
  useEffect(() => {
    if (!needsTransition && displayKey !== pageKey) {
      setDisplayKey(pageKey);
      setDisplayChildren(childrenRef.current);
    }
  }, [pageKey, needsTransition, displayKey]);

  // Also sync displayChildren when there's no transition at all
  // (handles the case where children change but pageKey stays the same)
  useEffect(() => {
    if (!needsTransition && !isExiting) {
      setDisplayChildren(childrenRef.current);
    }
  });

  return (
    <>
      {/* Cinematic transition overlay */}
      <AnimatePresence>
        {needsTransition && !isExiting && (
          <motion.div
            key="page-overlay-in"
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{
              duration: 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
            onAnimationComplete={handleEnterComplete}
          >
            {/* Dark base */}
            <div className="absolute inset-0 bg-[#1A1A1A]" />

            {/* Gold accent streak — diagonal slash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.15) 45%, rgba(212,175,55,0.35) 48%, rgba(212,175,55,0.15) 51%, transparent 56%)',
              }}
            />

            {/* Secondary purple streak */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(95deg, transparent 55%, rgba(93,44,134,0.12) 60%, rgba(93,44,134,0.25) 63%, rgba(93,44,134,0.12) 66%, transparent 71%)',
              }}
            />
          </motion.div>
        )}

        {isExiting && !needsTransition && (
          <motion.div
            key="page-overlay-out"
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
            onAnimationComplete={handleExitComplete}
          >
            <div className="absolute inset-0 bg-[#1A1A1A]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.15) 45%, rgba(212,175,55,0.35) 48%, rgba(212,175,55,0.15) 51%, transparent 56%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(95deg, transparent 55%, rgba(93,44,134,0.12) 60%, rgba(93,44,134,0.25) 63%, rgba(93,44,134,0.12) 66%, transparent 71%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with subtle fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayKey}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  );
}