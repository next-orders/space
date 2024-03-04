import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GetChannel } from '../client/api';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic-ext'] });

export async function generateMetadata(): Promise<Metadata> {
  const channel = await GetChannel();
  if (!channel) return {};

  return { title: channel.name, description: channel.description };
}

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white md:bg-zinc-100">{children}</body>
    </html>
  );
}
