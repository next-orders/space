import { GetCheckout, GetProductBySlug } from "@/server/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BackBlock } from "@/components/BackBlock";
import { CurrencySign } from "@/components/CurrencySign";
import { Price } from "@/components/Price";
import { AddToCart } from "@/components/AddToCart";

type PageProps = {
  params: { product: string };
};

export default async function Page({ params }: PageProps) {
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

  const breadcrumbs = [
    { title: "Home page", href: "/" },
    {
      title: product.category?.name,
      href: `/catalog/${product.category?.slug}`,
    },
    { title: product.name, href: "#" },
  ];

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-4">
      <div className="mb-4 flex flex-row justify-between items-center">
        <Breadcrumbs links={breadcrumbs} />
        <BackBlock />
      </div>

      <div className="bg-white px-5 py-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-4 md:gap-4">
          <Image
            src={photo?.url ?? ""}
            alt={photo?.alt ?? ""}
            unoptimized
            width={600}
            height={600}
            className="col-span-1 aspect-square rounded-xl"
          />

          <div className="col-span-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {product.name}
            </h1>
            <div className="mt-1 font-normal text-zinc-400">
              {product?.weightValue}
              {product?.weightUnit}
            </div>

            <div className="mt-4 flex flex-row gap-6 items-center">
              <div className="text-2xl font-semibold tracking-tight">
                <Price value={product.gross} />
                <span className="pl-1 text-xl">
                  <CurrencySign code={product.currency} />
                </span>
              </div>

              <AddToCart product={product} />

              {isInCart && <p>In Cart!</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col xl:flex-row justify-between gap-4">
          {product.description && (
            <div>
              <div className="mb-1 font-medium text-zinc-400">Description</div>
              <div className="leading-snug">{product.description}</div>
            </div>
          )}

          <div>
            <div className="mb-1 font-medium text-zinc-400">Per 100 grams</div>
            <div className="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-zinc-100 rounded-2xl">
              <div>
                <div className="font-semibold">5g</div>
                <div>proteins</div>
              </div>
              <div>
                <div className="font-semibold">18g</div>
                <div>fats</div>
              </div>
              <div>
                <div className="font-semibold">14g</div>
                <div>carbs</div>
              </div>
              <div>
                <div className="font-semibold">684</div>
                <div>kcal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(product, undefined, 2)}
      </pre>
    </div>
  );
}
