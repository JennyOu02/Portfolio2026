'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { withBase } from '@/lib/paths';

function useTypewriter(words: string[]) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDeleting(true), 1400);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === '') {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? 45 : 90,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

interface HeroProps {
  kicker: string;
  name: string;
  shortName: string;
  tagline: string;
  typewriter: string[];
  stats: { value: string; label: string }[];
  cv: string;
}

export default function Hero({ kicker, name, shortName, tagline, typewriter, stats, cv }: HeroProps) {
  const typed = useTypewriter(typewriter);

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center overflow-hidden">
      {/* aurora blobs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-neon-cyan/15 blur-[120px] animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-neon-magenta/15 blur-[120px] animate-float-slower" />
        <div className="absolute bottom-1/4 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[110px] animate-float-slow" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="kicker mb-6"
      >
        {kicker}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-5xl sm:text-7xl font-bold tracking-tight"
      >
        {name.split('(')[0].trim()}
        <span className="block mt-3 neon-text">{shortName}</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-8 h-8 font-mono text-xl sm:text-2xl text-neon-cyan"
      >
        <span>{typed}</span>
        <span className="ml-0.5 inline-block w-[2px] h-6 bg-neon-cyan align-middle animate-blink" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 max-w-xl text-ink-dim leading-relaxed"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/#work" className="btn-neon">
          View Work
        </Link>
        <a href={withBase(cv)} className="btn-ghost">
          Download CV
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
      >
        {stats.map((s) => (
          <div key={s.label} className="glass px-5 py-4">
            <p className="font-display text-2xl font-bold neon-text">{s.value}</p>
            <p className="mt-1 text-xs text-ink-dim leading-snug">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 hidden sm:block font-mono text-xs text-ink-faint tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </header>
  );
}
