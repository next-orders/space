import Link from "next/link";
import Image from "next/image";
import type { CheckoutLine } from "@next-orders/api-sdk";
import { Price } from "@/components/Price";
import { Counter } from "@/components/Counter";
import { getCurrencySign, getWeightLocalizedUnit } from "@/client/helpers";
import { Locale } from "@/dictionaries";

type CheckoutLineBlockProps = {
  locale: Locale;
} & CheckoutLine;

export const CheckoutLineBlock = ({
  locale,
  quantity,
  variant,
  id,
}: CheckoutLineBlockProps) => {
  const price = variant?.gross;
  const photo = variant.media?.length ? variant.media[0] : undefined;

  const currencySign = getCurrencySign(variant.currency);

  const weightUnitLocalized = getWeightLocalizedUnit(
    variant.weightUnit,
    locale,
  );

  // Prepare Item URL
  const pageUrl = `/catalog/${variant.category.slug}/${variant.slug}`;

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <Link href={pageUrl}>
        <div className="max-w-[16rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer hover:scale-95 duration-200 group">
          <Image
            src={photo?.url ?? "/static/no-image-zinc.png"}
            alt={photo?.alt ?? ""}
            width={48}
            height={48}
            className="w-16 h-16 aspect-square rounded-xl"
          />

          <div>
            <div className="font-base text-sm leading-tight line-clamp-1">
              {variant.name}
            </div>
            <div className="mt-1 flex flex-row gap-2 flex-nowrap">
              <div className="text-sm text-zinc-500 font-light">
                {variant.weightValue}
                {weightUnitLocalized}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="ml-auto">
        <Counter count={quantity} lineId={id} />
      </div>

      <div className="min-w-[3rem] ml-4 text-lg text-right">
        <Price value={price} />
        <span className="text-sm">{currencySign}</span>
      </div>
    </div>
  );
};
