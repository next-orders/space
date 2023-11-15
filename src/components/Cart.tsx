"use client";

import Image from "next/image";
import Link from "next/link";
import { IconInfoHexagon, IconX } from "@tabler/icons-react";
import type { Channel, Checkout, CheckoutLine } from "@next-orders/api-sdk";
import { Counter } from "@/components/Counter";
import { Price } from "@/components/Price";
import { CartDeliveryMethodToggle } from "@/components/CartDeliveryMethodToggle";
import { useUIStore } from "@/store/ui";
import { getDictionary, Locale } from "@/dictionaries";
import { getCurrencySign } from "@/client/helpers";

type CartProps = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const Cart = ({ channel, checkout }: CartProps) => {
  const closeCartDrawer = useUIStore((state) => state.closeCartDrawer);
  const toggleDeliveryInfoModal = useUIStore(
    (state) => state.toggleDeliveryInfoModal,
  );

  const items = checkout?.lines?.map((line) => (
    <CartItemLine key={line.id} {...line} />
  ));

  const isEmpty = items?.length === 0;

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  const locale = channel?.languageCode || "EN";
  const { CART_LABEL, CART_NEXT_BUTTON, DETAILED_CONDITIONS_LABEL } =
    getDictionary(channel?.languageCode);

  const currencySign = getCurrencySign(channel?.currencyCode);

  return (
    <div className="relative bg-white rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
      <div className="h-screen overflow-y-auto">
        <div className="mb-48">
          <div className="mb-4 flex flex-row justify-between items-center">
            <p className="text-2xl font-medium">{CART_LABEL}</p>

            <button
              onClick={closeCartDrawer}
              aria-label="Close Cart"
              className="block xl:hidden rounded-xl hover:scale-90 hover:bg-zinc-100 duration-200"
            >
              <IconX stroke={1.5} className="w-8 h-8" />
            </button>
          </div>

          <div className="mt-2 mb-4">
            <CartDeliveryMethodToggle channel={channel} checkout={checkout} />
          </div>

          {isEmpty && <CartEmpty locale={locale} />}
          {items}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rounded-2xl bg-zinc-50">
        <button
          onClick={toggleDeliveryInfoModal}
          className="relative my-4 mx-4 flex flex-row gap-3 flex-wrap items-center hover:scale-95 duration-200"
        >
          <IconInfoHexagon stroke={1.5} className="w-8 h-8 text-zinc-300" />

          <div className="text-left">
            <DeliveryInfoBlock
              method={checkout?.deliveryMethod || "DELIVERY"}
              shippingPrice={checkout?.shippingPrice || 0}
              currencySign={currencySign}
              locale={locale}
            />

            <div className="text-sm text-zinc-500">
              {DETAILED_CONDITIONS_LABEL}
            </div>
          </div>
        </button>

        {!isEmpty && (
          <div className="my-4 mx-4">
            <Link
              href={"/checkout"}
              className="w-full px-4 py-4 flex flex-row gap-2 flex-wrap justify-between items-center rounded-xl cursor-pointer hover:scale-95 duration-200"
              style={{ backgroundColor, backgroundImage }}
            >
              <div className="font-normal">{CART_NEXT_BUTTON}</div>
              <div className="font-medium text-lg">
                {checkout?.totalPrice} <span className="text-base">$</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItemLine = ({ quantity, variant, id }: CheckoutLine) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0] : undefined;

  const currencySign = getCurrencySign(variant.currency);

  // Prepare Item URL
  const pageUrl = `/catalog/${variant.category.slug}/${variant.slug}`;

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <Link href={pageUrl}>
        <div className="max-w-[10rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer hover:scale-95 duration-200 group">
          <Image
            src={photo?.url ?? "/static/no-image-zinc.png"}
            alt={photo?.alt ?? ""}
            width={48}
            height={48}
            className="w-12 h-12 aspect-square rounded-xl xl:grayscale xl:contrast-75 xl:brightness-150 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
          />

          <div>
            <div className="font-base text-sm leading-tight line-clamp-1">
              {variant.name}
            </div>
            <div className="mt-1 flex flex-row gap-2 flex-nowrap">
              <div className="text-sm font-medium">
                <Price value={price} />
                <span className="text-xs">{currencySign}</span>
              </div>
              <div className="text-sm text-zinc-500 font-light">
                {variant?.weightValue}
                {variant?.weightUnit}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Counter count={quantity} lineId={id} />
    </div>
  );
};

type CartEmptyProps = {
  locale: Locale;
};

const CartEmpty = ({ locale }: CartEmptyProps) => {
  const { EMPTY_CART_DESCRIPTION } = getDictionary(locale);

  return (
    <div className="mt-8">
      <Image
        src="/static/eggs.png"
        alt=""
        width={96}
        height={96}
        className="mx-auto mb-2 grayscale opacity-60"
      />
      <div className="text-lg text-center font-normal text-zinc-500">
        {EMPTY_CART_DESCRIPTION}
      </div>
    </div>
  );
};

type DeliveryInfoBlockProps = {
  shippingPrice: number;
  method: Checkout["deliveryMethod"];
  currencySign: string;
  locale: Locale;
};

const DeliveryInfoBlock = ({
  shippingPrice,
  method,
  currencySign,
  locale,
}: DeliveryInfoBlockProps) => {
  const { DISCOUNT_LABEL, MIN_LABEL, DELIVERY_LABEL } = getDictionary(locale);

  let avg;
  let block;

  if (method === "WAREHOUSE") {
    avg = "15–20";
    block = (
      <>
        {DISCOUNT_LABEL} 10<span className="text-xs">%</span>
      </>
    );
  }

  if (method === "DELIVERY") {
    avg = "45–60";
    block = (
      <>
        {DELIVERY_LABEL} {shippingPrice}
        <span className="text-xs">{currencySign}</span>
      </>
    );
  }

  return (
    <div className="flex flex-row gap-1 leading-tight">
      <div className="text-sm">
        {avg} {MIN_LABEL}
      </div>
      <span className="text-zinc-300">/</span>
      <div className="text-sm">{block}</div>
    </div>
  );
};
