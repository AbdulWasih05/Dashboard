import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/providers/ReduxProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'optional',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Personalized Content Dashboard',
  description: 'Your personalized hub for movies, news, social feeds, and weather',
};

// Viewport configuration for better mobile performance
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins for faster LCP */}
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
      </head>
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ReduxProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgb(var(--card))',
                color: 'rgb(var(--card-foreground))',
                border: '1px solid rgb(var(--border))',
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
