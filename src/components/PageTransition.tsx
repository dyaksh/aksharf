'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useCallback, useRef, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

/**
 * Cinematic page transition overlay.
 * When pageKey changes, a dark overlay with accent streak sweeps in,
 * content swaps, then overlay sweeps out.
 */
export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  // The key currently being displayed
  const [displayKey, setDisplayKey] = useState(pageKey);
  // Frozen children during transition (only updated in event handlers)
  const [frozenChildren, setFrozenChildren] = useState<ReactNode>(null);
  // Whether the overlay is in its "exit" phase (sliding out to the left)
  const [isExiting, setIsExiting] = useState(false);
  // Keep a ref to the latest children so callbacks always read fresh value
  const childrenRef = useRef(children);

  // Sync ref on every render
  useEffect(() => {
    childrenRef.current = children;
  });

  // Derived: do we need a transition?
  const needsTransition = pageKey !== displayKey;
  // During transition or exit, show frozen content; otherwise show live children
  const isTransitioning = needsTransition || isExiting;

  // When overlay enter animation completes, swap content and start exit
  const handleEnterComplete = useCallback(() => {
    setFrozenChildren(childrenRef.current);
    setDisplayKey(pageKey);
    setIsExiting(true);
  }, [pageKey]);

  // When overlay exit animation completes, clean up
  const handleExitComplete = useCallback(() => {
    setIsExiting(false);
    setFrozenChildren(null);
  }, []);

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

            {/* accent streak — diagonal slash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(125,68,168,0.15) 45%, rgba(125,68,168,0.35) 48%, rgba(125,68,168,0.15) 51%, transparent 56%)',
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
                  'linear-gradient(105deg, transparent 40%, rgba(125,68,168,0.15) 45%, rgba(125,68,168,0.35) 48%, rgba(125,68,168,0.15) 51%, transparent 56%)',
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
          {isTransitioning && frozenChildren ? frozenChildren : children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
