import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import type { MenuCategory } from "@next-orders/api-sdk";
import {
  GetChannel,
  GetCheckout,
  GetMenu,
  GetProductsInCategory,
} from "@/client/api";
import { ProductCard } from "@/components/ProductCard";
import { MainShell } from "@/components/MainShell";
import { getDictionary, Locale } from "@/dictionaries";

export default async function Page() {
  const [channel, checkout] = await Promise.all([
    GetChannel(),
    GetCheckout("123"),
  ]);

  const menu = await GetMenu(channel?.menus[0].id || "");

  const categories = menu?.categories?.map(async (category) => (
    <CategoryBlock
      key={category.id}
      category={category}
      locale={channel?.languageCode || "EN"}
    />
  ));

  return (
    <MainShell channel={channel} checkout={checkout}>
      <h1 className="mb-2 text-3xl font-medium">{channel?.name}</h1>
      <div className="mb-6">{channel?.description}</div>

      {categories}
    </MainShell>
  );
}

type CategoryBlockProps = {
  category: MenuCategory;
  locale: Locale;
};

const CategoryBlock = async ({ category, locale }: CategoryBlockProps) => {
  const { OPEN_CATEGORY_BUTTON } = getDictionary(locale);

  // Load Products in this category
  const products = await GetProductsInCategory(category.id);
  if (!products || !products.length) {
    return null;
  }

  // Limit 6 products
  const showProducts = products.slice(0, 6).map((product) => {
    const productUrl = "/catalog/" + product.category.slug + "/" + product.slug;

    return (
      <ProductCard
        key={product.id}
        locale={locale}
        productUrl={productUrl}
        {...product}
      />
    );
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2">
        <h2 className="text-2xl md:text-3xl font-medium">{category.name}</h2>

        <Link
          href={`/catalog/${category.slug}`}
          className="px-5 py-3 flex flex-row gap-2 text-base font-normal cursor-pointer rounded-2xl bg-zinc-200 hover:bg-zinc-300 hover:scale-95 duration-200"
        >
          {OPEN_CATEGORY_BUTTON} <IconArrowRight stroke={1.5} />
        </Link>
      </div>
      <div
        key={category.id}
        className="mt-4 mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2"
      >
        {showProducts}
      </div>
    </>
  );
};
