import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Category } from "@next-orders/api-sdk";
import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { ProductCard } from "@/components/ProductCard";

export default async function Page() {
  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Nourishing and tasty</h1>
      <div className="mb-6">Welcome to the site!</div>

      <Categories />
    </div>
  );
}

const Categories = async () => {
  const categories = await GetCategories();
  if (!categories) {
    return <div>No Categories found :(</div>;
  }

  return categories.map(async (category) => (
    <CategoryBlock key={category.id} category={category} />
  ));
};

type CategoryBlockProps = {
  category: Category;
};

const CategoryBlock = async ({ category }: CategoryBlockProps) => {
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
        <h2 className="text-2xl md:text-3xl font-semibold">{category.name}</h2>

        <Button
          component={Link}
          href={`/catalog/${category.slug}`}
          size="lg"
          rightSection={<IconArrowRight stroke={1.5} />}
          className="px-5 text-base font-medium bg-zinc-200 hover:bg-zinc-300 rounded-2xl"
        >
          Open category
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
};
