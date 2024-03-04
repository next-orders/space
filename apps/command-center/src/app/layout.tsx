import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@next-orders/ui';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Command Center',
  description: 'Management of all Business Entities',
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
