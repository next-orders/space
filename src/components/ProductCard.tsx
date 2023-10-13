import Link from "next/link";
import Image from "next/image";
import { ProductVariant } from "@next-orders/api-sdk";

type ProductCardProps = {
  productUrl: string;
} & ProductVariant;

export const ProductCard = ({
  name,
  weightUnit,
  weightValue,
  gross,
  media,
  productUrl,
}: ProductCardProps) => {
  const photo = media?.length ? media[0] : undefined;

  return (
    <Link href={productUrl}>
      <div className="bg-white rounded-2xl h-auto w-auto max-w-[22rem] p-3 cursor-pointer">
        <div className="flex flex-col justify-between h-full">
          <div>
            <Image
              src={photo?.url ?? ""}
              alt={photo?.alt ?? ""}
              unoptimized
              width={300}
              height={300}
              className="w-full aspect-square rounded-xl"
            />
            <div className="mt-2 text-xl font-medium">{gross} ₽</div>
            <div className="font-light leading-tight line-clamp-2">{name}</div>
            <div className="mt-2 font-light text-zinc-400">
              {weightValue} {weightUnit}
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between mt-2 w-full h-12 bg-zinc-100 rounded-xl">
            <div className="w-full text-center text-2xl font-light">+</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
