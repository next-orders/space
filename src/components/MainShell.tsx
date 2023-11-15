import React from "react";
import type { Channel, Checkout } from "@next-orders/api-sdk";
import { Navigation } from "@/components/Navigation";
import { DeliveryInfoModal } from "@/components/DeliveryInfoModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { DemoWarningBlock } from "@/components/DemoWarningBlock";

type MainShellProps = {
  channel: Channel | null;
  checkout: Checkout | null;
  children: React.ReactNode;
};

export const MainShell = ({ channel, checkout, children }: MainShellProps) => {
  const locale = channel?.languageCode || "EN";

  return (
    <>
      <header className="z-20 h-16 bg-white fixed top-0 left-0 right-0">
        <Header channel={channel} checkout={checkout} />
      </header>

      <Navigation channel={channel} checkout={checkout} />

      <main className="relative w-auto bg-zinc-100 md:pl-72 xl:pr-80 top-16">
        {process.env.NEXT_PUBLIC_ENABLE_DEMO && (
          <DemoWarningBlock locale={locale} />
        )}

        <div className="px-4 pb-10 pt-4">{children}</div>

        {channel && checkout && (
          <DeliveryInfoModal
            checkout={checkout}
            channel={channel}
            locale={locale}
          />
        )}

        <CartDrawer channel={channel} checkout={checkout} />
        <Footer />
      </main>

      <aside className="hidden w-0 xl:block xl:w-80 fixed right-0 bottom-0 top-16">
        <div className="pr-4 py-4 h-full bg-zinc-100">
          <Cart checkout={checkout} channel={channel} />
        </div>
      </aside>
    </>
  );
};
