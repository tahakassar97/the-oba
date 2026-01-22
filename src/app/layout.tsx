import type { Metadata } from 'next';
import { Poppins, Cairo } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { TanstackProvider } from '@/_libs/api';
import { AuthProvider } from '@/_libs/auth';
import { ToastProvider } from '@/_libs/components';

import './globals.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'The OBA',
  description: 'The OBA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} ${cairo.variable}`}>
        <AuthProvider>
          <TanstackProvider>
            <NextTopLoader
              color='#000'
              initialPosition={0.3}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={false}
              easing='ease'
              speed={200}
              shadow='0 0 10px #2299DD,0 0 5px #2299DD'
              zIndex={1600}
              showAtBottom={false}
            />
            <ToastProvider>{children}</ToastProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
