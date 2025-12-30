
'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// Metadata cannot be exported from a client component.
// We can define it here, but it won't be used by Next.js in this setup.
// For metadata to work, we would need to move the path-based logic
// to a separate client component inside the body.
/*
export const metadata: Metadata = {
  title: 'Elevate',
  description: 'Elevate – Rise Above All. The official hub for the inter-college volleyball tournament.',
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en" className="dark">
      <head>
        <title>Elevate</title>
        <meta name="description" content="Elevate – Rise Above All. The official hub for the inter-college volleyball tournament." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex min-h-screen flex-col">
          {!isAdminPage && <Header />}
          <main className="flex-1">{children}</main>
          {!isAdminPage && <Footer />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
