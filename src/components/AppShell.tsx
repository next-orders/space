"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Channel, Checkout, Shop } from "@next-orders/api-sdk";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Cart } from "@/components/Cart";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

type AppShellProps = {
  shop: Shop | null;
  channel: Channel | null;
  checkout: Checkout | null;
  children: React.ReactNode;
};

export const AppShell = ({
  shop,
  channel,
  checkout,
  children,
}: AppShellProps) => {
  const [isNavbarOpened, { toggle, close }] = useDisclosure();
  const [
    isCartDrawerOpened,
    { toggle: cartDrawerToggle, close: cartDrawerClose },
  ] = useDisclosure();

  return (
    <>
      <header className="z-10 h-16 md:h-20 bg-white fixed top-0 left-0 right-0">
        <Header
          isNavbarOpened={isNavbarOpened}
          toggle={toggle}
          cartDrawerToggle={cartDrawerToggle}
          channel={channel}
          checkout={checkout}
        />
      </header>

      <nav
        className="z-10 w-0 hidden md:block md:w-72 fixed top-16 md:top-20 data-[active=true]:w-full data-[active=true]:block md:data-[active=true]:w-72"
        data-active={isNavbarOpened}
      >
        <Navigation shop={shop} channel={channel} toggle={toggle} />
      </nav>

      <main
        className="relative w-auto md:pl-72 xl:pr-80 top-16 md:top-20"
        onClick={close}
      >
        <div className="px-4 pb-10 mt-4">{children}</div>
        <CartDrawer
          channel={channel}
          checkout={checkout}
          opened={isCartDrawerOpened}
          close={cartDrawerClose}
        />
        <Footer />
      </main>

      <aside className="hidden w-0 xl:block xl:w-80 fixed right-0 bottom-0 top-16 md:top-20">
        <div className="pr-4 py-4 h-full bg-zinc-100">
          <Cart checkout={checkout} channel={channel} />
        </div>
      </aside>
    </>
  );
};
