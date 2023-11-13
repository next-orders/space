"use client";

import Link from "next/link";
import {
  IconClock,
  IconDiscount2,
  IconLink,
  IconTruckDelivery,
} from "@tabler/icons-react";
import type { Channel, Checkout } from "@next-orders/api-sdk";
import { LinkButton } from "@/components/LinkButton";
import { useUIStore } from "@/store/ui";

type NavigationProps = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const Navigation = ({ channel, checkout }: NavigationProps) => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);
  const toggleNavbar = useUIStore((state) => state.toggleNavbar);
  const toggleDeliveryInfoModal = useUIStore(
    (state) => state.toggleDeliveryInfoModal,
  );

  const menu = channel?.menus[0];

  const buttons = menu?.categories?.map((item) => {
    return (
      <LinkButton
        key={item.id}
        link={"/catalog/" + item.slug}
        label={item.name}
        iconUrl={item.iconUrl}
      />
    );
  });

  return (
    <nav
      className="z-10 w-0 hidden md:block md:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:block md:data-[active=true]:w-72"
      data-active={isNavbarOpened}
    >
      <div className="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
        <div className="h-screen overflow-y-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="font-medium text-xl"
              style={{ color: channel?.accentTextColor }}
              onClick={toggleNavbar}
            >
              {channel?.name}
            </Link>
            <div className="mt-1 text-sm leading-tight">
              {channel?.description}
            </div>
          </div>

          <div className="mb-8">
            {checkout?.deliveryMethod === "WAREHOUSE" && (
              <SelfPickupInfoBlock />
            )}
            {checkout?.deliveryMethod === "DELIVERY" && <DeliveryInfoBlock />}

            <button
              onClick={toggleDeliveryInfoModal}
              className="flex flex-row gap-2 items-center hover:scale-95 duration-200"
            >
              <IconLink stroke={1.5} /> show details
            </button>
          </div>

          <div className="mb-32">
            <p className="font-medium text-lg">Catalog</p>
            {buttons}
          </div>
        </div>
      </div>
    </nav>
  );
};

const DeliveryInfoBlock = () => {
  return (
    <>
      <p className="font-medium text-lg mb-2">Delivery</p>

      <div className="flex flex-row gap-2 items-center mb-2">
        <IconClock stroke={1.5} /> today until 22:00
      </div>

      <div className="flex flex-row gap-2 items-center mb-2">
        <IconTruckDelivery stroke={1.5} />
        <div>
          free from 25
          <span className="text-sm">$</span>
        </div>
      </div>
    </>
  );
};

const SelfPickupInfoBlock = () => {
  return (
    <>
      <p className="font-medium text-lg mb-2">Self-pickup</p>

      <div className="flex flex-row gap-2 items-center mb-2">
        <IconClock stroke={1.5} /> today until 23:00
      </div>

      <div className="flex flex-row gap-2 items-center mb-2">
        <IconDiscount2 stroke={1.5} />
        <div>
          discount 10
          <span className="text-sm">%</span>
        </div>
      </div>
    </>
  );
};
