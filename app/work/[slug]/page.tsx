import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import Reveal from '@/components/Reveal';
import { getProject, getProjects } from '@/lib/content';
import { withBase } from '@/lib/paths';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? 'Case Study',
    description: project?.tagline,
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta: { label: string; value: string }[] = [
    { label: 'Organisation', value: project.org },
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.period },
    { label: 'Location', value: project.location },
  ].filter((m) => m.value);

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Link
            href="/#work"
            className="font-mono text-xs text-ink-faint hover:text-neon-cyan transition-colors"
          >
            ← BACK TO WORK
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${
                project.kind === 'Professional'
                  ? 'border-neon-magenta/50 text-neon-magenta bg-neon-magenta/10'
                  : 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10'
              }`}
            >
              {project.kind}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border border-line text-ink-dim">
              {project.category}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-ink-dim leading-relaxed max-w-2xl">{project.tagline}</p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {meta.map((m) => (
              <div key={m.label} className="glass px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  {m.label}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] px-2 py-1 rounded bg-white/[0.04] border border-line text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 rounded-2xl overflow-hidden border border-line">
            <img
              src={withBase(project.cover)}
              alt={project.title}
              className="w-full max-h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
          </div>
        </Reveal>

        {/* CONTEXT */}
        <Reveal className="mt-16">
          <h2 className="kicker mb-4">The Context</h2>
          <p className="text-ink-dim leading-relaxed">{project.context}</p>
        </Reveal>

        {/* PROBLEM */}
        <Reveal className="mt-12">
          <h2 className="kicker mb-4 text-neon-magenta">The Problem</h2>
          <div className="glass border-neon-magenta/20 p-6">
            <p className="text-ink leading-relaxed">{project.problem}</p>
          </div>
        </Reveal>

        {/* SOLUTION */}
        <Reveal className="mt-12">
          <h2 className="kicker mb-4">The Solution</h2>
          <ul className="space-y-3">
            {project.solution.map((s, i) => (
              <li key={i} className="glass p-5 flex gap-4">
                <span className="font-mono text-neon-cyan shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-ink-dim leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* IMPACT */}
        {project.impact.length > 0 && (
          <Reveal className="mt-12">
            <h2 className="kicker mb-4">The Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.impact.map((m) => (
                <div
                  key={m.label}
                  className="glass p-6 text-center transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-glow-cyan"
                >
                  <p className="font-display text-3xl font-bold neon-text">{m.value}</p>
                  <p className="mt-2 text-xs text-ink-dim leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* BODY (optional additional notes) */}
        {project.body && (
          <Reveal className="mt-12 space-y-4">
            {project.body.split(/\n\n+/).map((p, i) => (
              <p key={i} className="text-ink-dim leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>
        )}

        {/* GALLERY */}
        {project.gallery.length > 0 && (
          <Reveal className="mt-16">
            <h2 className="kicker mb-6">Gallery</h2>
            <Gallery items={project.gallery} />
          </Reveal>
        )}

        {/* LINKS */}
        {project.links.length > 0 && (
          <Reveal className="mt-14">
            <div className="flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url.startsWith('/') ? withBase(l.url) : l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neon"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
