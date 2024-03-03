import { notFound } from "next/navigation";
import { GetProductVariantById } from "@/client/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductVariantEditMediaModal } from "@/app/(authenticated)/product-variant/[id]/ProductVariantEditMediaModal";
import { ProductVariantBlock } from "@/app/(authenticated)/product-variant/[id]/ProductVariantBlock";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/client/locale";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const locale = getLocale();

  const product = await GetProductVariantById(params.id);
  if (!product) {
    notFound();
  }

  const { PRODUCT_VARIANT_PAGE_LABEL } = getDictionary(locale);

  return (
    <>
      <Breadcrumbs keys={["PRODUCT_VARIANT_PAGE"]} />

      <h1 className="mb-2 text-3xl font-semibold">
        {PRODUCT_VARIANT_PAGE_LABEL}
      </h1>

      <ProductVariantBlock product={product} />

      <pre className="mt-8">{JSON.stringify(product, null, 2)}</pre>

      <ProductVariantEditMediaModal productVariantId={product.id} />
    </>
  );
}
