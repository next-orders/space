import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@mantine/core";
import { Channel, Checkout, CheckoutLine } from "@next-orders/api-sdk";
import { Counter } from "@/components/Counter";
import { CurrencySign } from "@/components/CurrencySign";
import { Price } from "@/components/Price";
import { CartTypeToggle } from "@/components/CartTypeToggle";
import { IconInfoHexagon } from "@tabler/icons-react";

type Props = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const Cart = ({ channel, checkout }: Props) => {
  const items = checkout?.lines?.map((line) => (
    <CartItemLine key={line.id} {...line} />
  ));

  const isEmpty = items?.length === 0;

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  return (
    <div className="relative bg-white rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
      <ScrollArea className="h-screen">
        <div className="mb-48">
          <p className="mb-2 text-2xl font-semibold">Cart</p>

          <div className="mt-2 mb-4">
            <CartTypeToggle channel={channel} />
          </div>

          {isEmpty && <CartEmpty />}
          {items}
        </div>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 rounded-2xl bg-zinc-50">
        <div className="my-4 mx-4 flex flex-row gap-2 flex-nowrap items-center">
          <IconInfoHexagon
            stroke={1.5}
            className="w-6 h-6 min-w-fit text-zinc-400"
          />
          <div className="leading-tight text-sm text-zinc-500">
            Here will be the Info about delivery
          </div>
        </div>
        <div className="my-4 mx-4">
          <button
            className="w-full px-4 py-4 flex flex-row gap-2 flex-wrap justify-between items-center rounded-xl cursor-pointer hover:scale-95 duration-200"
            style={{ backgroundColor, backgroundImage }}
          >
            <div className="font-medium">Okay, next</div>
            <div className="font-semibold text-lg">
              15.18 <span className="text-base">$</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const CartItemLine = ({ quantity, variant }: CheckoutLine) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0] : undefined;

  // Prepare Item URL
  const categorySlug = variant.category.slug;
  const pageUrl = `/catalog/${categorySlug}/${variant.slug}`;

  // Filter on images?
  const imageFilter =
    "xl:grayscale xl:contrast-75 xl:brightness-150 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100";

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <Link href={pageUrl}>
        <div className="max-w-[10rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer hover:scale-95 duration-200 group">
          <Image
            src={photo?.url ?? "/static/no-image-zinc.png"}
            alt={photo?.alt ?? ""}
            width={100}
            height={100}
            className={`w-12 aspect-square rounded-xl ${imageFilter}`}
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
      <div className="text-lg text-center font-medium text-zinc-500">
        Your cart is empty
      </div>
    </div>
  );
};
