import { notFound } from "next/navigation";
import {
  GetCategories,
  GetCategoryBySlug,
  GetProductsInCategory,
} from "@/server/actions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BackBlock } from "@/components/BackBlock";
import { ProductCard } from "@/components/ProductCard";
import { Metadata } from "next";

type PageProps = {
  params: { category: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = await GetCategoryBySlug(params.category);
  if (!category) return {};

  return { title: category.name, description: category.slug };
}

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

  const breadcrumbs = [
    { title: "Home page", href: "/" },
    { title: category.name, href: "#" },
  ];

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
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-4">
      <div className="mb-4 flex flex-row justify-between items-center">
        <Breadcrumbs links={breadcrumbs} />
        <BackBlock />
      </div>

      <h1 className="text-3xl font-semibold">{category.name}</h1>
      <div>Here are all the products from this category</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        <Products />
      </div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(category, undefined, 2)}
      </pre>
    </div>
  );
}
