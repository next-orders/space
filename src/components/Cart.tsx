import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Checkout, CheckoutLine } from "@/types";
import Image from "next/image";

export const Cart = ({ checkout }: { checkout: Checkout | null }) => {
  const lines = checkout?.lines;

  const ItemLines = () => {
    return lines?.map((line) => <ItemLine key={line.id} {...line} />);
  };

  return (
    <div className="bg-white h-full">
      <div className="px-4 py-4 h-full flex flex-col justify-between">
        <div>
          <p className="mb-4 text-2xl font-semibold">Корзина</p>
          <ItemLines />
        </div>

        <div className="px-4 py-4 flex flex-row justify-between items-center bg-emerald-300 rounded-xl cursor-pointer">
          <div className="font-medium">Хорошо, далее</div>
          <div className="font-semibold text-lg">1518 ₽</div>
        </div>
      </div>
    </div>
  );
};

const ItemLine = ({ quantity, variant }: CheckoutLine) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0] : undefined;

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
            <div className="text-sm font-medium">{price} ₽</div>
            <div className="text-sm text-zinc-400 font-light">
              {variant?.weightValue} {variant?.weightUnit}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center bg-zinc-100 w-20 min-w-[5.5rem] rounded-2xl px-2 py-2">
        <div className="text-2xl font-light leading-none">
          <IconMinus stroke={1.5} className="w-5 h-5" />
        </div>
        <div className="text-sm">{quantity}</div>
        <div className="text-2xl font-light leading-none">
          <IconPlus stroke={1.5} className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
