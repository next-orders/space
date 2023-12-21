import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import {
  GetCategories,
  GetCategoryBySlug,
  GetChannel,
  GetMenu,
  GetProductsInCategory,
} from "@/client/api";
import { getDictionary } from "@/dictionaries";

type PageProps = {
  readonly params: { category: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = await GetCategoryBySlug(params.category);
  if (!category) return {};

  return { title: category.name, description: category.slug };
}

export default async function Page({ params }: PageProps) {
  const channel = await GetChannel();

  const menu = await GetMenu(channel?.menus[0].id ?? "");

  const categories = await GetCategories(menu?.id ?? "");
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
  const productsInCategory = await GetProductsInCategory(category.id);
  if (!productsInCategory) {
    return <div>No Products here :(</div>;
  }

  const locale = channel?.languageCode ?? "EN";
  const { HOME_PAGE_LABEL, CATEGORY_PAGE_DEFAULT_DESCRIPTION } =
    getDictionary(locale);

  const breadcrumbs = [
    { title: HOME_PAGE_LABEL, href: "/" },
    { title: category.name, href: "#" },
  ];

  const products = productsInCategory.map((product) => {
    const productUrl = category.slug + "/" + product.slug;

    return (
      <ProductCard
        key={product.id}
        locale={locale}
        productUrl={productUrl}
        currencyCode={channel?.currencyCode}
        {...product}
      />
    );
  });

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="text-3xl font-medium">{category.name}</h1>
      <div>{CATEGORY_PAGE_DEFAULT_DESCRIPTION}</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        {products}
      </div>
    </>
  );
}
