import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Category } from "@next-orders/api-sdk";
import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { ProductCard } from "@/components/ProductCard";

export default async function Page() {
  const categories = await GetCategories();
  if (!categories) {
    notFound();
  }

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Сытно и вкусно</h1>
      <div className="mb-6">Добро пожаловать на сайт!</div>

      <CategoriesBlock categories={categories} />
    </div>
  );
}

type CategoriesBlockProps = {
  categories: Category[];
};

const CategoriesBlock = ({ categories }: CategoriesBlockProps) => {
  return categories.map(async (category) => {
    // Load Products in this category
    const products = await GetProductsInCategory(category.id);
    if (!products || !products.length) {
      return null;
    }

    // Limit 6 products
    const showProducts = products.slice(0, 6);

    const Products = () => {
      return showProducts.map((product) => {
        const mainVariant = product.variants?.length
          ? product.variants[0]
          : undefined;
        if (!mainVariant) return null;

        const productUrl = "/catalog/" + category.slug + "/" + product.slug;

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
      <>
        <div className="flex flex-row justify-between items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {category.name}
          </h2>

          <Button
            component={Link}
            href={`/catalog/${category.slug}`}
            size="lg"
            rightSection={<IconArrowRight stroke={1.5} />}
            className="px-5 text-base font-medium bg-zinc-200 hover:bg-zinc-300 rounded-2xl"
          >
            Открыть категорию
          </Button>
        </div>
        <div
          key={category.id}
          className="mt-4 mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2"
        >
          <Products />
        </div>
      </>
    );
  });
};
