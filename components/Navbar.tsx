'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { withBase } from '@/lib/paths';

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#beyond', label: 'Beyond Work' },
  { href: '/#contact', label: 'Contact' },
];

/**
 * Mirrors the hero card's box so the nav's edges land on the card's borders:
 * the hero caps its frame at 1300px inside a clamp() gutter, so the cap here
 * is that width plus the gutter the padding gives back.
 */
const SHELL: React.CSSProperties = {
  maxWidth: 'calc(1300px + 2 * clamp(10px, 2vw, 24px))',
  paddingLeft: 'clamp(10px, 2vw, 24px)',
  paddingRight: 'clamp(10px, 2vw, 24px)',
};

export default function Navbar({ cv }: { cv: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-night/80 backdrop-blur-lg border-b border-line' : 'bg-transparent'
      }`}
    >
      <div style={SHELL} className="mx-auto py-4 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Jenny Ou — home"
          className="font-display text-2xl font-bold tracking-tight text-ink hover:text-neon-cyan transition-colors"
          onClick={() => setOpen(false)}
        >
          O<span className="text-neon-cyan">.</span>J
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-sm text-ink-dim hover:text-neon-cyan transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a href={withBase(cv)} className="neon-chip hover:shadow-glow-cyan transition-shadow">
            CV ↓
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-night/95 backdrop-blur-lg border-b border-line">
          <div style={SHELL} className="mx-auto pb-6 pt-2 space-y-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-mono text-sm text-ink-dim hover:text-neon-cyan transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a href={withBase(cv)} className="inline-block mt-3 neon-chip">
              Download CV ↓
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
