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
import { getDictionary, Locale } from "@/dictionaries";

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

  const locale = channel?.languageCode || "EN";
  const { SHOW_DETAILS_LABEL, CATALOG_LABEL } = getDictionary(locale);

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
              <SelfPickupInfoBlock locale={locale} />
            )}
            {checkout?.deliveryMethod === "DELIVERY" && (
              <DeliveryInfoBlock locale={locale} />
            )}

            <button
              onClick={toggleDeliveryInfoModal}
              className="flex flex-row gap-2 items-center hover:scale-95 duration-200"
            >
              <IconLink stroke={1.5} /> {SHOW_DETAILS_LABEL}
            </button>
          </div>

          <div className="mb-32">
            <p className="font-medium text-lg">{CATALOG_LABEL}</p>
            {buttons}
          </div>
        </div>
      </div>
    </nav>
  );
};

type DeliveryInfoBlockProps = {
  locale: Locale;
};

const DeliveryInfoBlock = ({ locale }: DeliveryInfoBlockProps) => {
  const { DELIVERY_LABEL } = getDictionary(locale);

  return (
    <>
      <p className="font-medium text-lg mb-2">{DELIVERY_LABEL}</p>
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

type SelfPickupInfoBlockProps = {
  locale: Locale;
};

const SelfPickupInfoBlock = ({ locale }: SelfPickupInfoBlockProps) => {
  const { SELF_PICKUP_LABEL } = getDictionary(locale);

  return (
    <>
      <p className="font-medium text-lg mb-2">{SELF_PICKUP_LABEL}</p>
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
