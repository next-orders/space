import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { GetChannel, GetCheckout, GetShop } from "@/client/api";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { DeliveryInfoModal } from "@/components/DeliveryInfoModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";

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
        <header className="z-10 h-16 bg-white fixed top-0 left-0 right-0">
          <Header channel={channel} checkout={checkout} />
        </header>

        <Navigation shop={shop} channel={channel} />

        <main className="relative w-auto md:pl-72 xl:pr-80 top-16">
          <div className="px-4 pb-10 mt-4">{children}</div>
          <DeliveryInfoModal />
          <CartDrawer channel={channel} checkout={checkout} />
          <Footer />
        </main>

        <aside className="hidden w-0 xl:block xl:w-80 fixed right-0 bottom-0 top-16">
          <div className="pr-4 py-4 h-full bg-zinc-100">
            <Cart checkout={checkout} channel={channel} />
          </div>
        </aside>
      </body>
    </html>
  );
}
