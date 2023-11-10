import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GetShop } from "@/client/api";

import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const shop = await GetShop();
  if (!shop) return {};

  return { title: shop.name, description: shop.description };
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
