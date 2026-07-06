'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { withBase } from '@/lib/paths';

interface GalleryItem {
  src: string;
  caption?: string;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((a) => (a === null ? a : (a + dir + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close, step]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setActive(i)}
            className="group glass overflow-hidden text-left transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-glow-cyan"
          >
            <div className="h-44 overflow-hidden bg-panel">
              <img
                src={withBase(g.src)}
                alt={g.caption || ''}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {g.caption && (
              <p className="px-3 py-2 font-mono text-[11px] text-ink-dim">{g.caption}</p>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night/95 backdrop-blur-sm p-4 sm:p-10"
            onClick={close}
          >
            <button
              className="absolute top-5 right-6 font-mono text-2xl text-ink-dim hover:text-neon-cyan"
              aria-label="Close"
            >
              ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 sm:left-8 font-mono text-3xl text-ink-dim hover:text-neon-cyan"
              aria-label="Previous"
            >
              ‹
            </button>
            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={withBase(items[active].src)}
                alt={items[active].caption || ''}
                className="max-h-[80vh] w-auto mx-auto rounded-lg border border-line"
              />
              {items[active].caption && (
                <figcaption className="mt-3 text-center font-mono text-sm text-ink-dim">
                  {items[active].caption}
                </figcaption>
              )}
            </motion.figure>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 sm:right-8 font-mono text-3xl text-ink-dim hover:text-neon-cyan"
              aria-label="Next"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
