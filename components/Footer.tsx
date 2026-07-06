export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-ink-faint">
          DESIGNED & BUILT WITH <span className="text-neon-magenta">◆</span> NEON
        </p>
      </div>
    </footer>
  );
}
