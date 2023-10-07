import { GetProductBySlug } from "@/server/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@mantine/core";
import { BackBlock } from "@/app/catalog/[category]/[product]/Back";

type PageProps = {
  params: { product: string };
};

export default async function Page({ params }: PageProps) {
  const product = await GetProductBySlug(params.product);
  if (!product) {
    notFound();
  }

  const mainVariant = product.variants?.length
    ? product.variants[0]
    : undefined;
  if (!mainVariant) return null;

  const photo = mainVariant.media?.length ? mainVariant.media[0] : undefined;

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <BackBlock />

      <div className="bg-white px-5 py-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-4 md:gap-4">
          <Image
            src={photo?.url ?? ""}
            alt={photo?.alt ?? ""}
            unoptimized
            width={600}
            height={600}
            className="col-span-1 aspect-square rounded-xl"
          />

          <div className="col-span-2">
            <h1 className="text-xl md:text-3xl font-semibold">
              {mainVariant.name}
            </h1>
            <div className="mt-1 font-light text-zinc-400">
              {mainVariant.weightValue} {mainVariant.weightUnit}
            </div>

            <div className="mt-4 mb-2 text-2xl font-medium">
              {mainVariant.gross} ₽
            </div>

            <Button
              size="lg"
              className="px-5 bg-emerald-300 rounded-2xl mx-auto"
            >
              Добавить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
