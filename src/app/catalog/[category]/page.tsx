import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { ProductVariant } from "@/types";

type PageProps = {
  params: { category: string };
};

export default async function Page({ params }: PageProps) {
  const categories = await GetCategories();
  if (!categories) {
    notFound();
  }

  // This page exist?
  const possibleLinks = categories.map((category) => category.slug);
  if (!possibleLinks.includes(params.category)) {
    notFound();
  }

  const category = categories.find((cat) => cat.slug === params.category);
  if (!category) {
    notFound();
  }

  // Load Products in this category
  const products = await GetProductsInCategory(category.id);
  if (!products) {
    return <div>Товаров нет :(</div>;
  }

  const Products = () => {
    return products.map((product) => {
      const mainVariant = product.variants?.length
        ? product.variants[0]
        : undefined;
      if (!mainVariant) return null;

      const productUrl = category.slug + "/" + product.slug;

      return (
        <ProductCard
          key={mainVariant.id}
          productUrl={productUrl}
          {...mainVariant}
        />
      );
    });
  };

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="text-3xl font-semibold">{category.name}</h1>
      <div>Здесь все товары из этой категории</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        <Products />
      </div>
    </div>
  );
}

type ProductCardProps = {
  productUrl: string;
} & ProductVariant;

const ProductCard = ({
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
