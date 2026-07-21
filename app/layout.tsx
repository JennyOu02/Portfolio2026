import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Sora, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile } from '@/lib/content';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
// Used by the hero dashboard, which follows its own type scale.
const sora = Sora({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-sora' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Jenny Ou — Product × Engineering × AI',
    template: '%s — Jenny Ou',
  },
  description:
    'Portfolio of Jenny Ou — project manager and builder turning messy, manual processes into products that ship. AI systems, product management and full-stack engineering.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${sora.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* fixed backdrop layers */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-grid" />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-scanlines" />

        <div className="relative z-10">
          <Navbar cv={profile.cv} />
          {children}
          <Footer name={profile.name.split('(')[0].trim()} />
        </div>
      </body>
    </html>
  );
}
