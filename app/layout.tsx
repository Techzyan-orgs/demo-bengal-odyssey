import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bengal Odyssey | বঙ্গ অভিযান - Premier Tours & Treks in Bengal',
  description:
    'Premier tour and travel agency based in Kolkata, West Bengal. Curated guided expeditions, backpacking treks, wildlife safaris, and corporate retreats across Darjeeling, Dooars, Sundarbans, Puri, Sikkim, and offbeat trails.',
  openGraph: {
    title: 'Bengal Odyssey | বঙ্গ অভিযান - Premier Tours & Treks in Bengal',
    description:
      'Premier tour and travel agency based in Kolkata, West Bengal. Curated guided expeditions, backpacking treks, wildlife safaris, and corporate retreats across Darjeeling, Dooars, Sundarbans, Puri, Sikkim, and offbeat trails.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bengal Odyssey | বঙ্গ অভিযান - Premier Tours & Treks in Bengal',
    description:
      'Premier tour and travel agency based in Kolkata, West Bengal. Curated guided expeditions, backpacking treks, wildlife safaris, and corporate retreats across Darjeeling, Dooars, Sundarbans, Puri, Sikkim, and offbeat trails.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body className="bg-stone-950 text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
