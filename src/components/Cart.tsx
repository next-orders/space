import Image from "next/image";
import { Checkout, CheckoutLine } from "@next-orders/api-sdk";
import { Counter } from "@/components/Counter";
import { CurrencySign } from "@/components/CurrencySign";
import { Price } from "@/components/Price";

type Props = {
  checkout: Checkout | null;
};

export const Cart = ({ checkout }: Props) => {
  const lines = checkout?.lines;

  const ItemLines = () => {
    return lines?.map((line) => <CartItemLine key={line.id} {...line} />);
  };

  return (
    <div className="bg-white h-full">
      <div className="px-4 py-4 h-full flex flex-col justify-between">
        <div>
          <p className="mb-4 text-2xl font-semibold">Cart</p>
          <ItemLines />
        </div>

        <div className="px-4 py-4 flex flex-row justify-between items-center bg-emerald-300 hover:bg-emerald-400 rounded-xl cursor-pointer">
          <div className="font-medium">Okay, next</div>
          <div className="font-semibold text-lg">
            15.18 <span className="text-base">$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemLine = ({ quantity, variant }: CheckoutLine) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0].media : undefined;

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <Image
          src={photo?.url ?? ""}
          alt={photo?.alt ?? ""}
          unoptimized
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
