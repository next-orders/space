import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.scss";

const inter = Inter({ subsets: ["latin", "cyrillic-ext"] });

export const metadata: Metadata = {
  title: "Command Center",
  description: "Management of all Business Entities",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white">{children}</body>
    </html>
  );
}
