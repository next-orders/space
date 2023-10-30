import Image from "next/image";
import { ScrollArea } from "@mantine/core";
import { Checkout, CheckoutLine } from "@next-orders/api-sdk";
import { Counter } from "@/components/Counter";
import { CurrencySign } from "@/components/CurrencySign";
import { Price } from "@/components/Price";

type Props = {
  checkout: Checkout | null;
};

export const Cart = ({ checkout }: Props) => {
  const items = checkout?.lines?.map((line) => (
    <CartItemLine key={line.id} {...line} />
  ));

  const isEmpty = items?.length === 0;

  return (
    <div className="pr-4 py-4 h-full bg-zinc-100">
      <div className="relative bg-white rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
        <ScrollArea className="h-screen">
          <div className="mb-24">
            <p className="mb-4 text-2xl font-semibold">Cart</p>
            {isEmpty && <CartEmpty />}
            {items}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-2xl">
          <div className="my-4 mx-4">
            <div className="px-4 py-4 flex flex-row justify-between items-center bg-emerald-300 hover:bg-emerald-400 rounded-xl cursor-pointer">
              <div className="font-medium">Okay, next</div>
              <div className="font-semibold text-lg">
                15.18 <span className="text-base">$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemLine = ({ quantity, variant }: CheckoutLine) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0] : undefined;

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <Image
          src={photo?.url ?? "/static/no-image-zinc.png"}
          alt={photo?.alt ?? ""}
          width={100}
          height={100}
          className="w-14 min-w-[3rem] aspect-square rounded-xl"
        />

        <div>
          <div className="font-light text-sm leading-tight">{variant.name}</div>
          <div className="mt-1 flex flex-row gap-2">
            <div className="text-sm font-medium">
              <Price value={price} />
              <span className="text-xs">
                <CurrencySign code={variant.currency} />
              </span>
            </div>
            <div className="text-sm text-zinc-400 font-light">
              {variant?.weightValue}
              {variant?.weightUnit}
            </div>
          </div>
        </div>
      </div>

      <Counter count={quantity} />
    </div>
  );
};

const CartEmpty = () => {
  return (
    <div>
      <Image
        src="/static/eggs.png"
        alt=""
        width={96}
        height={96}
        className="mx-auto mb-2 grayscale"
      />
      <div className="text-lg text-center font-medium">Your cart is empty</div>
    </div>
  );
};
