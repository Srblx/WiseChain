// Helpers
import setupLocatorUI from '@locator/runtime';

// Libs Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import Footer from '@/components/ui/footer/Footer.component';
import Navbar from '@/components/ui/nav/Navbar.component';

// CSS Module
import { UserProvider } from '@/context/user.context';
import '@/style/globals.css';
import { Toaster } from 'sonner';

// Initialize MinIO
import './init-minio';

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'WiseChain',
  description: 'Learning blockchain and investment with WiseChain. Xiss',
};

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI();
}

export default function RootLayout({
  children,
  showFooter = true,
}: Readonly<{
  children: React.ReactNode;
  showFooter?: boolean;
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${inter.className} `}>
        <Toaster richColors closeButton />
        <UserProvider>
          <Navbar />
          <main className="xs:mx-8 sm:mx-20 md:mx-24 lg:mx-32 mt-4">
            {children}
          </main>
          {/* {showFooter &&  */}
          <Footer />
          {/* } */}
        </UserProvider>
      </body>
    </html>
  );
}
