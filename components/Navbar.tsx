'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { withBase } from '@/lib/paths';

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#beyond', label: 'Beyond Work' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar({ logo, cv }: { logo: string; cv: string }) {
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
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={withBase(logo)} alt="Jenny Ou" className="h-8 w-auto" />
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
        <div className="md:hidden bg-night/95 backdrop-blur-lg border-b border-line px-6 pb-6 pt-2 space-y-1">
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
      )}
    </nav>
  );
}
