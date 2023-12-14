import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Price } from "@/components/Price";
import { AddToCart } from "@/components/AddToCart";
import { GetChannel, GetCheckout, GetProductBySlug } from "@/client/api";
import {
  DEFAULT_IMAGE_URL,
  getCurrencySign,
  getProductFirstPhoto,
  getWeightLocalizedUnit,
} from "@/client/helpers";
import { getDictionary } from "@/dictionaries";

type PageProps = {
  params: { product: string };
};

export default async function Page({ params }: PageProps) {
  const channel = await GetChannel();

  const product = await GetProductBySlug(params.product);
  if (!product) {
    notFound();
  }

  // Check, if in Cart already
  const checkout = await GetCheckout();
  const isInCart = checkout?.lines.find(
    (line) => line.productVariant.id === product.id,
  );

  const firstPhoto = getProductFirstPhoto(product.media);
  const currencySign = getCurrencySign(channel?.currencyCode);

  const isNutritionShown =
    product.per100gEnergy ||
    product.per100gProtein ||
    product.per100gCarbohydrate ||
    product.per100gFat;

  const locale = channel?.languageCode || "EN";
  const {
    HOME_PAGE_LABEL,
    IN_CART_LABEL,
    DESCRIPTION_LABEL,
    IN_100_GRAMS_LABEL,
    PROTEINS_LABEL,
    FATS_LABEL,
    CARBS_LABEL,
    KCAL_LABEL,
    GRAM_SHORT_LABEL,
  } = getDictionary(locale);

  const weightUnitLocalized = getWeightLocalizedUnit(
    product.weightUnit,
    locale,
  );

  const breadcrumbs = [
    { title: HOME_PAGE_LABEL, href: "/" },
    {
      title: product.category?.name,
      href: `/catalog/${product.category?.slug}`,
    },
    { title: product.name, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <div className="bg-white px-5 py-5 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
          <div className="col-span-1 relative w-full aspect-square">
            <Image
              src={firstPhoto?.url ?? DEFAULT_IMAGE_URL}
              alt={firstPhoto?.alt ?? ""}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="rounded-xl object-cover object-center"
            />
          </div>

          <div className="col-span-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
              {product.name}
            </h1>
            <div className="mt-1 font-normal text-zinc-400">
              {product?.weightValue}
              {weightUnitLocalized}
            </div>

            <div className="mt-4 flex flex-row gap-6 items-center">
              <div className="text-2xl font-medium tracking-tight">
                <Price value={product.gross} />
                <span className="pl-1 text-xl">{currencySign}</span>
              </div>

              <AddToCart product={product} channel={channel} />
            </div>

            {isInCart && (
              <div className="mt-2 text-zinc-500">{IN_CART_LABEL}!</div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col xl:flex-row justify-between gap-4">
          {product.description && (
            <div>
              <div className="mb-1 font-medium text-zinc-400">
                {DESCRIPTION_LABEL}
              </div>
              <div className="leading-snug">{product.description}</div>
            </div>
          )}

          {isNutritionShown && (
            <div>
              <div className="mb-1 font-medium text-zinc-400">
                {IN_100_GRAMS_LABEL}
              </div>
              <div className="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-zinc-100 rounded-2xl">
                <div>
                  <div className="font-medium">{product.per100gEnergy}</div>
                  <div>{KCAL_LABEL}</div>
                </div>
                <div>
                  <div className="font-medium">
                    {product.per100gProtein}
                    {GRAM_SHORT_LABEL}
                  </div>
                  <div>{PROTEINS_LABEL}</div>
                </div>
                <div>
                  <div className="font-medium">
                    {product.per100gFat}
                    {GRAM_SHORT_LABEL}
                  </div>
                  <div>{FATS_LABEL}</div>
                </div>
                <div>
                  <div className="font-medium">
                    {product.per100gCarbohydrate}
                    {GRAM_SHORT_LABEL}
                  </div>
                  <div>{CARBS_LABEL}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
