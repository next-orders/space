import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { AppShell } from "@/components/AppShell";
import { GetChannel, GetCheckout, GetShop } from "@/client/api";
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
  const [shop, channel, checkout] = await Promise.all([
    GetShop(),
    GetChannel(),
    GetCheckout("123"),
  ]);

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-zinc-100">
        <AppShell shop={shop} channel={channel} checkout={checkout}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
