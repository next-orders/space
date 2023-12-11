import Link from "next/link";
import Image from "next/image";
import type { CheckoutLine, CurrencyCode } from "@next-orders/api-sdk";
import { Price } from "@/components/Price";
import { Counter } from "@/components/Counter";
import {
  DEFAULT_IMAGE_URL,
  getCurrencySign,
  getProductFirstPhoto,
  getWeightLocalizedUnit,
} from "@/client/helpers";
import { Locale } from "@/dictionaries";

type CheckoutLineBlockProps = {
  locale: Locale;
  currencyCode: CurrencyCode | undefined;
} & CheckoutLine;

export const CheckoutLineBlock = ({
  locale,
  currencyCode,
  quantity,
  productVariant,
  id,
}: CheckoutLineBlockProps) => {
  const price = productVariant?.gross;
  const firstPhoto = getProductFirstPhoto(productVariant.media);

  const currencySign = getCurrencySign(currencyCode);

  const weightUnitLocalized = getWeightLocalizedUnit(
    productVariant.weightUnit,
    locale,
  );

  // Prepare Item URL
  const pageUrl = `/catalog/${productVariant.category.slug}/${productVariant.slug}`;

  return (
    <div className="mb-4 flex flex-row gap-2 items-center justify-between">
      <Link href={pageUrl}>
        <div className="max-w-[16rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer hover:scale-95 active:scale-90 duration-200 group">
          <div className="relative w-16 h-16 aspect-square">
            <Image
              src={firstPhoto?.url ?? DEFAULT_IMAGE_URL}
              alt={firstPhoto?.alt ?? ""}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="rounded-xl object-cover object-center"
            />
          </div>

          <div>
            <div className="font-base text-sm leading-tight line-clamp-1">
              {productVariant.name}
            </div>
            <div className="mt-1 flex flex-row gap-2 flex-nowrap">
              <div className="text-sm text-zinc-500 font-light">
                {productVariant.weightValue}
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
