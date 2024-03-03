import { GetMenuById, GetProducts } from "@/client/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import CategoriesBlock from "@/app/(authenticated)/menu/[id]/CategoriesBlock";
import { ProductVariantCreateModal } from "@/app/(authenticated)/menu/[id]/ProductVariantCreateModal";
import { getLocale } from "@/client/locale";
import { getDictionary } from "@/dictionaries";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const locale = getLocale();
  const products = await GetProducts();
  const menu = await GetMenuById(params.id);

  const { MENU_PAGE_LABEL } = getDictionary(locale);

  return (
    <>
      <Breadcrumbs keys={["MENU_PAGE"]} />

      <h1 className="mb-2 text-3xl font-semibold">{MENU_PAGE_LABEL}</h1>

      <CategoriesBlock menuId={params.id} />

      <ProductVariantCreateModal
        menu={menu}
        products={products}
        categories={menu?.categories}
        locale={locale}
      />
    </>
  );
}
