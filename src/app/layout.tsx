import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'SpeakFlow — AI-Powered English Speaking Practice & Feedback',
  description:
    'Master fluent English speaking with instant AI analysis on grammar, vocabulary, fluency, and pronunciation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
