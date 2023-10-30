"use client";

import React from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Channel, Checkout, Shop } from "@next-orders/api-sdk";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

type Props = {
  shop: Shop | null;
  channel: Channel | null;
  checkout: Checkout | null;
  children: React.ReactNode;
};

export const Shell = ({ shop, channel, checkout, children }: Props) => {
  const [isNavbarOpened, { toggle, close }] = useDisclosure();
  const [
    isCartDrawerOpened,
    { toggle: cartDrawerToggle, close: cartDrawerClose },
  ] = useDisclosure();

  return (
    <AppShell
      zIndex={0}
      header={{ height: { base: 64, sm: 72, md: 72 } }}
      navbar={{
        width: 300,
        breakpoint: 768,
        collapsed: { mobile: !isNavbarOpened, desktop: false },
      }}
      aside={{
        width: 320,
        breakpoint: 1280,
        collapsed: { mobile: true, desktop: false },
      }}
      layout="default"
    >
      <AppShell.Header withBorder={false} zIndex={10}>
        <Header
          isNavbarOpened={isNavbarOpened}
          toggle={toggle}
          cartDrawerToggle={cartDrawerToggle}
          channel={channel}
        />
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} zIndex={5}>
        <Navigation shop={shop} channel={channel} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Aside withBorder={false}>
        <div className="pr-4 py-4 h-full bg-zinc-100">
          <Cart checkout={checkout} channel={channel} />
        </div>
      </AppShell.Aside>

      <AppShell.Main onClick={close}>
        <div className="px-4 pb-10 mt-4">{children}</div>
        <CartDrawer
          channel={channel}
          checkout={checkout}
          opened={isCartDrawerOpened}
          close={cartDrawerClose}
        />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};
