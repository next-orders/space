"use client";

import { IconBike, IconClock, IconDiscount2 } from "@tabler/icons-react";
import { useUIStore } from "@/store/ui";
import type { Channel, Checkout } from "@next-orders/api-sdk";
import { getDictionary, Locale } from "@/dictionaries";
import { getCurrencySign } from "@/client/helpers";

type DeliveryInfoModalProps = {
  checkout: Checkout;
  channel: Channel;
  locale: Locale;
};

export const DeliveryInfoModal = ({
  checkout,
  channel,
  locale,
}: DeliveryInfoModalProps) => {
  const isDeliveryInfoModalOpened = useUIStore(
    (state) => state.isDeliveryInfoModalOpened,
  );
  const closeDeliveryInfoModal = useUIStore(
    (state) => state.closeDeliveryInfoModal,
  );

  return (
    <>
      <div
        className="z-40 fixed left-0 right-0 -top-20 -bottom-20 bg-zinc-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
        onClick={closeDeliveryInfoModal}
        data-active={isDeliveryInfoModalOpened}
      />
      <div
        className="z-40 fixed left-0 top-0 w-full max-w-md h-auto p-2 m-0 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
        data-active={isDeliveryInfoModalOpened}
      >
        <div className="mt-16 px-8 py-8 bg-white rounded-2xl">
          <DeliveryInfoBlock
            locale={locale}
            channel={channel}
            checkout={checkout}
          />

          <button
            onClick={closeDeliveryInfoModal}
            className="mt-4 px-5 py-3 w-full text-center text-base font-medium cursor-pointer rounded-2xl bg-zinc-200 hover:bg-zinc-300 hover:scale-95 duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

type DeliveryInfoBlockProps = {
  locale: Locale;
  channel: Channel;
  checkout: Checkout;
};

const DeliveryInfoBlock = ({
  channel,
  checkout,
  locale,
}: DeliveryInfoBlockProps) => {
  const {
    DELIVERY_DETAILS_LABEL,
    SELF_PICKUP_DETAILS_LABEL,
    COURIER_PAYMENT_LABEL,
    DELIVER_AT_LABEL,
    PREPARE_AT_LABEL,
    DISCOUNT_LABEL,
    MORE_INFO_LABEL,
    NOW_LABEL,
    MIN_LABEL,
    MINIMUM_ORDER_VALUE,
    MAXIMUM_ORDER_WEIGHT,
  } = getDictionary(locale);

  const currencySign = getCurrencySign(channel.currencyCode);

  let title;
  let block;

  if (checkout.deliveryMethod === "WAREHOUSE") {
    title = SELF_PICKUP_DETAILS_LABEL;
    block = (
      <>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <IconDiscount2 stroke={1.5} />
            {DISCOUNT_LABEL}
          </div>
          <div>10 %</div>
        </div>

        <div className="mt-8 mb-2 text-xl font-medium">{PREPARE_AT_LABEL}</div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <IconClock stroke={1.5} />
            {NOW_LABEL}: 15-20 {MIN_LABEL}
          </div>
          <div></div>
        </div>

        <div className="mt-8 mb-2 text-xl font-medium">{MORE_INFO_LABEL}</div>

        <div className="mb-2 flex flex-row justify-between">
          <div>{MINIMUM_ORDER_VALUE}</div>
          <div>10 {currencySign}</div>
        </div>
      </>
    );
  }

  if (checkout.deliveryMethod === "DELIVERY") {
    title = DELIVERY_DETAILS_LABEL;
    block = (
      <>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <IconBike stroke={1.5} />
            {COURIER_PAYMENT_LABEL}
          </div>
          <div>
            {checkout.shippingPrice} {currencySign}
          </div>
        </div>

        <div className="mt-8 mb-2 text-xl font-medium">{DELIVER_AT_LABEL}</div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <IconClock stroke={1.5} />
            {NOW_LABEL}: 45-60 {MIN_LABEL}
          </div>
          <div></div>
        </div>

        <div className="mt-8 mb-2 text-xl font-medium">{MORE_INFO_LABEL}</div>

        <div className="mb-2 flex flex-row justify-between">
          <div>{MINIMUM_ORDER_VALUE}</div>
          <div>10 {currencySign}</div>
        </div>

        <div className="mb-2 flex flex-row justify-between">
          <div>{MAXIMUM_ORDER_WEIGHT}</div>
          <div>20 kg</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-2 text-2xl font-medium">{title}</div>
      {block}
    </>
  );
};
