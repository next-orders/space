import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Shell } from "@/components/Shell";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GetChannel, GetCheckout, GetShop } from "@/server/actions";

import "@mantine/core/styles.layer.css";
import "./globals.scss";

const inter = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"] });

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
    <html lang="en" className={inter.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="bg-zinc-100">
        <MantineProvider
          theme={{
            fontFamily: "inherit",
            primaryColor: "blue",
            primaryShade: { light: 5, dark: 7 },
            colors: {
              blue: [
                "#eff6ff",
                "#dbeafe",
                "#bfdbfe",
                "#93c5fd",
                "#60a5fa",
                "#3b82f6",
                "#2563eb",
                "#1d4ed8",
                "#1e40af",
                "#1e3a8a",
              ],
            },
          }}
          defaultColorScheme="light"
          forceColorScheme="light"
        >
          <Shell shop={shop} channel={channel} checkout={checkout}>
            {children}
          </Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
