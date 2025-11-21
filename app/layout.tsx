import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/providers/ReduxProvider';
import DndProvider from '@/components/providers/DndProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Personalized Content Dashboard',
  description: 'Your personalized hub for movies, news, social feeds, and weather',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ReduxProvider>
          <DndProvider>
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
          </DndProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
