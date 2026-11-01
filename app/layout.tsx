import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

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
    <html lang="en" className={`${plusJakartaSans.className} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.style.colorScheme = 'dark';
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950 transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
