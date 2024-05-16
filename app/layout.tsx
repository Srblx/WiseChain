import Footer from '@/components/Footer.components';
import Navbar from '@/components/Navbar.component';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './style/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'WiseChain',
  description: 'Learning blockchain and investment with WiseChain. Xiss',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
