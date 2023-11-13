import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GetChannel } from "@/client/api";

import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const channel = await GetChannel();
  if (!channel) return {};

  return { title: channel.name, description: channel.description };
}

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-white md:bg-zinc-100">{children}</body>
    </html>
  );
}
