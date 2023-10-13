import { notFound } from "next/navigation";
import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BackBlock } from "@/components/BackBlock";
import { ProductCard } from "@/components/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категория",
  description: "Закажите горячую пиццу и особенные суши",
};

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

  const breadcrumbs = [
    { title: "Главная", href: "/" },
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
      <div>Здесь все товары из этой категории</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        <Products />
      </div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(category, undefined, 2)}
      </pre>
    </div>
  );
}
