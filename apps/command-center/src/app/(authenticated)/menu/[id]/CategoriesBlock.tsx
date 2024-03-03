import Image from "next/image";
import Link from "next/link";
import { GetMenuById, GetProductVariantsInCategory } from "@/client/api";
import { MenuCategory, ProductVariant } from "@next-orders/api-sdk";
import { CategoryCreateBlock } from "@/app/(authenticated)/menu/[id]/CategoryCreateBlock";
import { CategoryButton } from "@/app/(authenticated)/menu/[id]/CategoryButton";
import { getLocale } from "@/client/locale";
import NoImage from "@/../public/static/no-image-zinc.png";

type CategoriesBlockProps = {
  menuId: string;
};

export default async function CategoriesBlock({
  menuId,
}: CategoriesBlockProps) {
  const menu = await GetMenuById(menuId);
  const locale = getLocale();

  const haveNoEntities = !menu?.categories?.length;
  if (haveNoEntities) {
    return <CategoryCreateBlock locale={locale} menuId={menuId} />;
  }

  const showCategories = menu.categories.map((category) => (
    <CategoryBlock key={category.id} category={category} />
  ));

  return (
    <div className="mt-4 mb-8">
      <div className="mb-8">
        <CategoryCreateBlock locale={locale} menuId={menuId} />
      </div>
      {showCategories}
    </div>
  );
}

type CategoryBlockProps = {
  category: MenuCategory;
};

const CategoryBlock = async ({ category }: CategoryBlockProps) => {
  const products = await GetProductVariantsInCategory(category.id);

  const showProducts = products?.map((variant) => (
    <ProductVariantCard key={variant.id} variant={variant} />
  ));

  return (
    <div className="mb-12">
      <div>
        <CategoryButton category={category} />
      </div>

      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {showProducts}
      </div>
    </div>
  );
};

type ProductVariantCardProps = {
  variant: ProductVariant;
};

const ProductVariantCard = ({ variant }: ProductVariantCardProps) => {
  const photo = variant.media.length ? variant.media[0].media : null;
  const url = `/product-variant/${variant.id}`;

  return (
    <Link
      href={url}
      className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 active:scale-90 duration-200 group"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={photo?.url ?? NoImage}
          alt={photo?.alt ?? ""}
          priority
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
          className="rounded-xl object-cover object-center"
        />
      </div>

      <div className="mt-2 text-base font-medium leading-tight text-center">
        {variant.name}
      </div>
    </Link>
  );
};
