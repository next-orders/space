import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Shell } from "@/components/Shell";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GetCategories, GetCheckout } from "@/server/actions";

import "@mantine/core/styles.layer.css";
import "./globals.scss";

const inter = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"] });

export const metadata: Metadata = {
  title: "Сытно и вкусно",
  description: "Закажите горячую пиццу и особенные суши",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, checkout] = await Promise.all([
    GetCategories(),
    GetCheckout("123"),
  ]);

  return (
    <html lang="ru" className={inter.className}>
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
          <Shell categories={categories} checkout={checkout}>
            {children}
          </Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
