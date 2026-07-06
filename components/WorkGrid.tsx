'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { withBase } from '@/lib/paths';

export interface WorkCard {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  kind: string;
  cover: string;
  tags: string[];
  impact: { value: string; label: string }[];
}

const FILTER_ORDER = ['All', 'Product & AI', 'Web Apps', 'Games', 'IoT'];

export default function WorkGrid({ projects }: { projects: WorkCard[] }) {
  const [filter, setFilter] = useState('All');

  const filters = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return FILTER_ORDER.filter((f) => f === 'All' || present.has(f));
  }, [projects]);

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
              filter === f
                ? 'border-neon-cyan/70 text-neon-cyan bg-neon-cyan/10 shadow-glow-cyan'
                : 'border-line text-ink-dim hover:border-neon-cyan/40 hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/work/${p.slug}/`}
                className="group glass block overflow-hidden transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-glow-cyan hover:-translate-y-1.5"
              >
                <div className="relative h-48 overflow-hidden bg-panel">
                  <img
                    src={withBase(p.cover)}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
                  <span
                    className={`absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border backdrop-blur-sm ${
                      p.kind === 'Professional'
                        ? 'border-neon-magenta/50 text-neon-magenta bg-neon-magenta/10'
                        : 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10'
                    }`}
                  >
                    {p.kind}
                  </span>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mb-1.5">
                    {p.category}
                  </p>
                  <h3 className="font-display text-xl font-bold group-hover:text-neon-cyan transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-dim leading-relaxed line-clamp-2">{p.tagline}</p>

                  {p.impact[0] && (
                    <p className="mt-3 font-mono text-xs text-neon-cyan/90">
                      ▸ {p.impact[0].value} — {p.impact[0].label}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-line text-ink-dim"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="font-mono text-[10px] px-2 py-0.5 text-ink-faint">
                        +{p.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 font-mono text-xs text-ink-faint group-hover:text-neon-magenta transition-colors">
                    READ CASE STUDY →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
