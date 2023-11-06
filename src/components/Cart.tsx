"use client";

import Image from "next/image";
import Link from "next/link";
import { IconInfoHexagon, IconX } from "@tabler/icons-react";
import type { Channel, Checkout, CheckoutLine } from "@next-orders/api-sdk";
import { Counter } from "@/components/Counter";
import { CurrencySign } from "@/components/CurrencySign";
import { Price } from "@/components/Price";
import { CartDeliveryMethodToggle } from "@/components/CartDeliveryMethodToggle";
import { useUIStore } from "@/store/ui";

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

  return (
    <div className="relative bg-white rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
      <div className="h-screen overflow-y-auto">
        <div className="mb-48">
          <div className="mb-4 flex flex-row justify-between items-center">
            <p className="text-2xl font-medium">Cart</p>

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

          {isEmpty && <CartEmpty />}
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
            {checkout?.deliveryMethod === "WAREHOUSE" && (
              <SelfPickupInfoBlock />
            )}
            {checkout?.deliveryMethod === "DELIVERY" && (
              <DeliveryInfoBlock shippingPrice={checkout.shippingPrice} />
            )}

            <div className="text-sm text-zinc-500">Detailed conditions</div>
          </div>
        </button>

        {!isEmpty && (
          <div className="my-4 mx-4">
            <button
              className="w-full px-4 py-4 flex flex-row gap-2 flex-wrap justify-between items-center rounded-xl cursor-pointer hover:scale-95 duration-200"
              style={{ backgroundColor, backgroundImage }}
            >
              <div className="font-normal">Okay, next</div>
              <div className="font-medium text-lg">
                {checkout?.totalPrice} <span className="text-base">$</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItemLine = ({ quantity, variant }: CheckoutLine) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0] : undefined;

  // Prepare Item URL
  const pageUrl = `/catalog/${variant.category.slug}/${variant.slug}`;

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <Link href={pageUrl}>
        <div className="max-w-[10rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer hover:scale-95 duration-200 group">
          <Image
            src={photo?.url ?? "/static/no-image-zinc.png"}
            alt={photo?.alt ?? ""}
            width={100}
            height={100}
            className="w-12 h-12 aspect-square rounded-xl xl:grayscale xl:contrast-75 xl:brightness-150 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
          />

          <div>
            <div className="font-base text-sm leading-tight line-clamp-1">
              {variant.name}
            </div>
            <div className="mt-1 flex flex-row gap-2 flex-nowrap">
              <div className="text-sm font-medium">
                <Price value={price} />
                <span className="text-xs">
                  <CurrencySign code={variant.currency} />
                </span>
              </div>
              <div className="text-sm text-zinc-500 font-light">
                {variant?.weightValue}
                {variant?.weightUnit}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Counter count={quantity} />
    </div>
  );
};

const CartEmpty = () => {
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
        Your cart is empty
      </div>
    </div>
  );
};

type DeliveryInfoBlockProps = {
  shippingPrice: number;
};

const DeliveryInfoBlock = ({ shippingPrice }: DeliveryInfoBlockProps) => {
  return (
    <div className="flex flex-row gap-1 leading-tight">
      <div className="text-sm">45–60 min</div>
      <span className="text-zinc-300">/</span>
      <div className="text-sm">
        Cost {shippingPrice}
        <span className="text-xs">$</span>
      </div>
    </div>
  );
};

const SelfPickupInfoBlock = () => {
  return (
    <div className="flex flex-row gap-1 leading-tight">
      <div className="text-sm">15–20 min</div>
      <span className="text-zinc-300">/</span>
      <div className="text-sm">
        Discount 10<span className="text-xs">%</span>
      </div>
    </div>
  );
};
