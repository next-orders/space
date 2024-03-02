'use client';

import Link from 'next/link';
import {
  IconClock,
  IconDiscount2,
  IconLink,
  IconTruckDelivery,
} from '@tabler/icons-react';
import type {
  Channel,
  Checkout,
  CheckoutDeliveryMethod,
  CurrencyCode,
  Menu,
} from '@next-orders/api-sdk';
import { LinkButton } from '@/components/LinkButton';
import { useUIStore } from '@/store/ui';
import { getDictionary, Locale } from '@/dictionaries';
import { getCurrencySign } from '@/client/helpers';

type NavigationProps = {
  channel: Channel | null;
  menu: Menu;
  checkout: Checkout | null;
};

export const Navigation = ({ channel, menu, checkout }: NavigationProps) => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);
  const toggleNavbar = useUIStore((state) => state.toggleNavbar);
  const toggleDeliveryInfoModal = useUIStore(
    (state) => state.toggleDeliveryInfoModal,
  );

  const buttons = menu?.categories?.map((item) => {
    return (
      <LinkButton
        key={item.id}
        link={'/catalog/' + item.slug}
        label={item.name}
        icon={item.icon}
      />
    );
  });

  const currencyCode = channel?.currencyCode;
  const locale = channel?.languageCode ?? 'EN';
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
            <DeliveryInfoBlock
              locale={locale}
              method={checkout?.deliveryMethod ?? 'DELIVERY'}
              currencyCode={currencyCode}
            />

            {checkout && (
              <button
                onClick={toggleDeliveryInfoModal}
                className="flex flex-row gap-2 items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
              >
                <IconLink stroke={1.5} /> {SHOW_DETAILS_LABEL}
              </button>
            )}
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
  method: CheckoutDeliveryMethod;
  currencyCode: CurrencyCode | undefined;
};

const DeliveryInfoBlock = ({
  locale,
  method,
  currencyCode,
}: DeliveryInfoBlockProps) => {
  const {
    DELIVERY_LABEL,
    SELF_PICKUP_LABEL,
    TODAY_UNTIL_LABEL,
    FREE_FROM_LABEL,
    DISCOUNT_LABEL,
  } = getDictionary(locale);

  const currencySign = getCurrencySign(currencyCode);

  let title;
  let todayUntil;
  let block;

  if (method === 'WAREHOUSE') {
    title = SELF_PICKUP_LABEL;
    todayUntil = '23:00';
    block = (
      <>
        <IconDiscount2 stroke={1.5} />
        <div className="lowercase">
          {DISCOUNT_LABEL} 10
          <span className="text-sm">%</span>
        </div>
      </>
    );
  }

  if (method === 'DELIVERY') {
    title = DELIVERY_LABEL;
    todayUntil = '22:00';
    block = (
      <>
        <IconTruckDelivery stroke={1.5} />
        <div className="lowercase">
          {FREE_FROM_LABEL} 25
          <span className="pl-1 text-sm">{currencySign}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="font-medium text-lg mb-2">{title}</p>
      <div className="flex flex-row gap-2 items-center mb-2">
        <IconClock stroke={1.5} /> {TODAY_UNTIL_LABEL} {todayUntil}
      </div>
      <div className="flex flex-row gap-2 items-center mb-2">{block}</div>
    </>
  );
};
