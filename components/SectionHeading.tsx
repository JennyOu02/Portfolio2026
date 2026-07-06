import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  intro?: string;
}

export default function SectionHeading({ index, label, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14">
      <p className="kicker mb-3">
        <span className="text-ink-faint">{index} //</span> {label}
      </p>
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-neon-gradient" />
      {intro && <p className="mt-6 max-w-2xl text-ink-dim leading-relaxed">{intro}</p>}
    </Reveal>
  );
}
