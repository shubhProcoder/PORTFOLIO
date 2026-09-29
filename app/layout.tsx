import './globals.css';
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { CommandPalette } from '@/components/ui/CommandPalette';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-machine',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shubh Mehrotra — AI Product Builder & Systems Engineer',
  description:
    'Portfolio of Shubh Mehrotra. Building hybrid RAG architectures, agent reliability harnesses, and high-velocity AI products.',
  openGraph: {
    title: 'Shubh Mehrotra — AI Product Builder',
    description: "I build systems for things that don't exist yet.",
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <Navigation />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
