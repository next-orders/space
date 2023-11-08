import React from "react";
import { HeaderCheckout } from "@/components/HeaderCheckout";
import { Footer } from "@/components/Footer";

type CheckoutLayoutProps = {
  children: React.ReactNode;
};

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProps) {
  return (
    <>
      <header className="z-10 h-16 bg-white fixed top-0 left-0 right-0">
        <HeaderCheckout />
      </header>

      <main className="relative mx-auto max-w-4xl top-16">
        <div className="px-4 pb-10 mt-4">{children}</div>
        <Footer />
      </main>
    </>
  );
}
