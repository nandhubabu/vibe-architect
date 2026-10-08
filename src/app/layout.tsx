import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#F9F6F0',
};

export const metadata: Metadata = {
  title: 'Vibe Architect — Cultural Intelligence & Spatial Atmosphere Designer',
  description:
    'An autonomous agent powered by Qloo’s 250M+ entity taste graph. Translates any human occasion or space into culturally grounded blueprints across music, dining, cinema, fashion, and spatial aesthetics.',
  keywords: [
    'Qloo',
    'Taste Graph',
    'Cultural Intelligence',
    'AI Agent',
    'Atmosphere Design',
    'Kinfolk Aesthetic',
    'Spatial Architecture',
  ],
  authors: [{ name: 'Vibe Architect Collective' }],
  openGraph: {
    title: 'Vibe Architect — Grounded in Qloo Cultural Intelligence',
    description:
      'Experience the difference when an AI agent is grounded in 250M+ cultural affinities rather than generic LLM guesswork.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
