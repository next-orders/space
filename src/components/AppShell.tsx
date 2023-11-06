"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Channel, Checkout, Shop } from "@next-orders/api-sdk";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Cart } from "@/components/Cart";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { DeliveryInfoModal } from "@/components/DeliveryInfoModal";

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
  const [
    isDeliveryInfoModalOpened,
    { toggle: deliveryInfoModalToggle, close: deliveryInfoModalClose },
  ] = useDisclosure();

  return (
    <>
      <header className="z-10 h-16 bg-white fixed top-0 left-0 right-0">
        <Header
          isNavbarOpened={isNavbarOpened}
          toggle={toggle}
          cartDrawerToggle={cartDrawerToggle}
          channel={channel}
          checkout={checkout}
        />
      </header>

      <nav
        className="z-10 w-0 hidden md:block md:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:block md:data-[active=true]:w-72"
        data-active={isNavbarOpened}
      >
        <Navigation
          shop={shop}
          channel={channel}
          toggle={toggle}
          deliveryInfoModalToggle={deliveryInfoModalToggle}
        />
      </nav>

      <main
        className="relative w-auto md:pl-72 xl:pr-80 top-16"
        onClick={close}
      >
        <div className="px-4 pb-10 mt-4">{children}</div>
        <DeliveryInfoModal
          opened={isDeliveryInfoModalOpened}
          close={deliveryInfoModalClose}
        />
        <CartDrawer
          channel={channel}
          checkout={checkout}
          opened={isCartDrawerOpened}
          close={cartDrawerClose}
          deliveryInfoModalToggle={deliveryInfoModalToggle}
        />
        <Footer />
      </main>

      <aside className="hidden w-0 xl:block xl:w-80 fixed right-0 bottom-0 top-16">
        <div className="pr-4 py-4 h-full bg-zinc-100">
          <Cart
            checkout={checkout}
            channel={channel}
            deliveryInfoModalToggle={deliveryInfoModalToggle}
          />
        </div>
      </aside>
    </>
  );
};
