"use client";

import React from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Channel, Checkout, Shop } from "@next-orders/api-sdk";

type Props = {
  shop: Shop | null;
  channel: Channel | null;
  checkout: Checkout | null;
  children: React.ReactNode;
};

export const Shell = ({ shop, channel, checkout, children }: Props) => {
  const [isNavbarOpened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 64, sm: 72, md: 72 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !isNavbarOpened, desktop: false },
      }}
      aside={{
        width: 300,
        breakpoint: "lg",
        collapsed: { mobile: true, desktop: false },
      }}
      layout="default"
    >
      <AppShell.Header withBorder={false}>
        <Header isNavbarOpened={isNavbarOpened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar withBorder={false}>
        <Navigation shop={shop} channel={channel} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Aside withBorder={false}>
        <Cart checkout={checkout} />
      </AppShell.Aside>

      <AppShell.Main onClick={close}>
        <div className="px-4 pb-10 mt-4 md:px-6">{children}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};
