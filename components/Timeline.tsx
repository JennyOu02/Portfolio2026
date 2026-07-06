import Link from 'next/link';
import Reveal from './Reveal';
import type { ExperienceItem } from '@/lib/content';

export default function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="relative ml-3 sm:ml-6 border-l border-line pl-8 sm:pl-12 space-y-14">
      {items.map((item, i) => (
        <Reveal key={`${item.company}-${item.period}`} delay={i * 0.05} className="relative">
          {/* glowing dot */}
          <span className="absolute -left-[41px] sm:-left-[57px] top-1.5 h-3.5 w-3.5 rounded-full bg-night border-2 border-neon-cyan shadow-glow-cyan" />

          <p className="font-mono text-xs tracking-widest text-neon-cyan/80 uppercase">{item.period}</p>
          <h3 className="mt-2 font-display text-2xl font-bold">{item.role}</h3>
          <p className="mt-1 text-ink-dim font-medium">
            {item.company} <span className="text-ink-faint">· {item.location}</span>
          </p>

          <ul className="mt-4 space-y-2.5">
            {item.bullets.map((b, j) => (
              <li key={j} className="flex gap-3 text-sm text-ink-dim leading-relaxed">
                <span className="text-neon-magenta mt-0.5 shrink-0">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {item.caseStudy && (
            <Link
              href={`/work/${item.caseStudy}/`}
              className="mt-4 inline-block font-mono text-xs text-neon-cyan hover:text-neon-magenta transition-colors"
            >
              VIEW CASE STUDY →
            </Link>
          )}
        </Reveal>
      ))}
    </div>
  );
}
