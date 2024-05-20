// Libs Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import Footer from '@/components/ui/Footer.component';
import Navbar from '@/components/ui/Navbar.component';

// CSS Module
import '@/style/globals.css';
import { Toaster } from 'sonner';

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
    <html lang='fr' className='bg-background'>
      <body className={`${inter.className} `}>
        <Toaster richColors closeButton />
        <Navbar />
        <main className='xs:mx-8 sm:mx-20 md:mx-24 lg:mx-36 mt-4'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
