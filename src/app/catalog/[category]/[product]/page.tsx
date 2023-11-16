import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Price } from "@/components/Price";
import { AddToCart } from "@/components/AddToCart";
import { GetChannel, GetCheckout, GetProductBySlug } from "@/client/api";
import { getCurrencySign } from "@/client/helpers";
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
  const checkout = await GetCheckout("123");
  const isInCart = checkout?.lines.find(
    (line) => line.variant.id === product.id,
  );

  const photo = product.media?.length ? product.media[0] : undefined;
  const currencySign = getCurrencySign(product.currency);

  const locale = channel?.languageCode || "EN";
  const { HOME_PAGE_BUTTON, IN_CART_LABEL, DESCRIPTION_LABEL } =
    getDictionary(locale);

  const breadcrumbs = [
    { title: HOME_PAGE_BUTTON, href: "/" },
    {
      title: product.category?.name,
      href: `/catalog/${product.category?.slug}`,
    },
    { title: product.name, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={channel?.languageCode || "EN"} />

      <div className="bg-white px-5 py-5 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
          <Image
            src={photo?.url ?? "/static/no-image-zinc.png"}
            alt={photo?.alt ?? ""}
            priority
            width={400}
            height={400}
            className="col-span-1 aspect-square rounded-xl"
          />

          <div className="col-span-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
              {product.name}
            </h1>
            <div className="mt-1 font-normal text-zinc-400">
              {product?.weightValue}
              {product?.weightUnit}
            </div>

            <div className="mt-4 flex flex-row gap-6 items-center">
              <div className="text-2xl font-medium tracking-tight">
                <Price value={product.gross} />
                <span className="pl-1 text-xl">{currencySign}</span>
              </div>

              <AddToCart product={product} channel={channel} />

              {isInCart && <p>{IN_CART_LABEL}!</p>}
            </div>
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

          <div>
            <div className="mb-1 font-medium text-zinc-400">Per 100 grams</div>
            <div className="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-zinc-100 rounded-2xl">
              <div>
                <div className="font-medium">5g</div>
                <div>proteins</div>
              </div>
              <div>
                <div className="font-medium">18g</div>
                <div>fats</div>
              </div>
              <div>
                <div className="font-medium">14g</div>
                <div>carbs</div>
              </div>
              <div>
                <div className="font-medium">684</div>
                <div>kcal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
