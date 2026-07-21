import HeroAbout from '@/components/HeroAbout';
import Journey from '@/components/Journey';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Timeline from '@/components/Timeline';
import WorkGrid from '@/components/WorkGrid';
import {
  getEducation,
  getExperience,
  getExtras,
  getProfile,
  getProjects,
  getSkills,
} from '@/lib/content';
import { withBase } from '@/lib/paths';

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const experience = getExperience();
  const education = getEducation();
  const skills = getSkills();
  const extras = getExtras();

  const workCards = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    category: p.category,
    kind: p.kind,
    cover: p.cover,
    tags: p.tags,
    impact: p.impact,
  }));

  const techExtras = extras.filter((e) => e.category === 'tech');
  const otherExtras = extras.filter((e) => e.category !== 'tech');

  // Hero dashboard: every number carries the case study it came from.
  const projectBySlug = new Map(projects.map((p) => [p.slug, p]));
  const proof = profile.stats.map((s) => {
    const p = s.slug ? projectBySlug.get(s.slug) : undefined;
    return { ...s, source: p?.title, org: p?.org };
  });
  const heroEducation = education
    .filter((e) => e.hero !== false)
    .map((e) => ({
      school: e.school,
      degree: e.short ?? e.degree,
      period: e.period,
      image: e.image,
      imageBg: e.imageBg,
    }));

  return (
    <main>
      {/* HERO + ABOUT — About lives on the back of the flip card */}
      <HeroAbout
        kicker={profile.heroKicker}
        tagline={profile.tagline}
        about={profile.about}
        email={profile.email}
        linkedin={profile.linkedin}
        github={profile.github}
        portrait={profile.portrait}
        proof={proof}
        education={heroEducation}
        skills={skills.heroSkills}
      />

      {/* JOURNEY — deliberately absent from the navbar */}
      <Journey />

      {/* WORK */}
      <section id="work" className="scroll-mt-24 py-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            index="02"
            label="Selected Work"
            title="Problems, solved."
            intro="Every project here is a case study: the context, the problem, what I built, and what it changed. Professional work and academic builds alike."
          />
          <Reveal>
            <WorkGrid projects={workCards} />
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="scroll-mt-24 py-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading index="03" label="Experience" title="Where I've delivered" />
          <Timeline items={experience} />
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="scroll-mt-24 py-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading index="04" label="Education" title="The foundations" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.1}>
                <div className="glass p-6 h-full flex flex-col transition-all duration-300 hover:border-neon-violet/50 hover:shadow-glow-violet">
                  <p className="font-mono text-xs tracking-widest text-neon-cyan/80 uppercase">
                    {e.period}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug">{e.degree}</h3>
                  <p className="mt-1 text-sm text-ink-dim font-medium">
                    {e.school} <span className="text-ink-faint">· {e.location}</span>
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-ink-dim leading-relaxed">
                    {e.details.map((d, j) => (
                      <p key={j}>{d}</p>
                    ))}
                  </div>
                  {e.image && (
                    // Fixed-height box + object-contain: every logo occupies the same
                    // space and none of them get stretched.
                    <div className="mt-auto flex h-40 items-center justify-center pt-8">
                      {e.imageBg === 'white' ? (
                        <div className="flex h-full items-center justify-center rounded-xl bg-white p-3">
                          <img
                            src={withBase(e.image)}
                            alt={e.school}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <img
                          src={withBase(e.image)}
                          alt={e.school}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-24 py-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading index="05" label="Skills" title="The toolkit" />
          <Reveal>
            <p className="kicker text-xs mb-6">{skills.iconGroupLabel}</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
              {skills.icons.map((s) => (
                <div
                  key={s.name}
                  className="glass flex flex-col items-center justify-center gap-2 py-5 transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-glow-cyan hover:-translate-y-1"
                >
                  <img src={withBase(s.icon)} alt={s.name} className="h-10 w-10 object-contain" />
                  <p className="font-mono text-[11px] text-ink-dim">{s.name}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker text-xs mt-12 mb-6">{skills.chipGroupLabel}</p>
            <div className="flex flex-wrap gap-2.5">
              {skills.chips.map((c) => (
                <span
                  key={c}
                  className="font-mono text-sm px-4 py-2 rounded-lg border border-line text-ink-dim bg-white/[0.02] transition-colors hover:border-neon-magenta/50 hover:text-neon-magenta"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEYOND WORK */}
      <section id="beyond" className="scroll-mt-24 py-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading index="06" label="Beyond Work" title="Off the clock" />
          <Reveal>
            <p className="kicker text-xs mb-6">Tech</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {techExtras.map((e) => (
                <div
                  key={e.title}
                  className="glass p-6 transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-glow-cyan"
                >
                  <h4 className="font-display font-bold">{e.title}</h4>
                  <p className="mt-1 font-mono text-xs text-neon-cyan/80">@ {e.org}</p>
                  <p className="mt-3 text-sm text-ink-dim leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker text-xs mb-6 text-neon-magenta">Beyond Tech</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherExtras.map((e) => (
                <div
                  key={e.title}
                  className="glass p-6 transition-all duration-300 hover:border-neon-magenta/50 hover:shadow-glow-magenta"
                >
                  <h4 className="font-display font-bold">{e.title}</h4>
                  <p className="mt-1 font-mono text-xs text-neon-magenta/80">@ {e.org}</p>
                  <p className="mt-3 text-sm text-ink-dim leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 py-28 border-t border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="kicker mb-4">07 // Contact</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Let&apos;s build something <span className="neon-text">worth measuring.</span>
            </h2>
            <p className="mt-6 text-ink-dim leading-relaxed">
              Open to product, AI and engineering opportunities — or just a good conversation about
              turning a messy process into a system.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={`mailto:${profile.email}`} className="btn-neon">
                Say Hello
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                GitHub
              </a>
            </div>
            <p className="mt-8 font-mono text-sm text-ink-faint">{profile.email}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
