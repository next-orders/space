import { GetProductBySlug } from "@/server/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@mantine/core";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BackBlock } from "@/components/BackBlock";

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

  const breadcrumbs = [
    { title: "Главная", href: "/" },
    {
      title: product.category?.name,
      href: `/catalog/${product.category?.slug}`,
    },
    { title: mainVariant.name, href: "#" },
  ];

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-4">
      <div className="mb-4 flex flex-row justify-between items-center">
        <Breadcrumbs links={breadcrumbs} />
        <BackBlock />
      </div>

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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {mainVariant.name}
            </h1>
            <div className="mt-1 font-normal text-zinc-400">
              {mainVariant.weightValue} {mainVariant.weightUnit}
            </div>

            <div className="mt-4 flex flex-row gap-6 items-center">
              <div className="text-2xl font-semibold tracking-tight">
                {mainVariant.gross}
                <span className="pl-1 text-xl">₽</span>
              </div>
              <Button size="lg" className="px-5 bg-emerald-300 rounded-2xl">
                Добавить
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row justify-between gap-4">
          {product.description && (
            <div>
              <div className="mb-1 font-medium text-zinc-400">Описание</div>
              <div className="leading-snug">{product.description}</div>
            </div>
          )}

          <div>
            <div className="mb-1 font-medium text-zinc-400">На 100 грамм</div>
            <div className="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-zinc-100 rounded-2xl">
              <div>
                <div className="font-semibold">5г</div>
                <div>белки</div>
              </div>
              <div>
                <div className="font-semibold">18г</div>
                <div>жиры</div>
              </div>
              <div>
                <div className="font-semibold">14г</div>
                <div>углеводы</div>
              </div>
              <div>
                <div className="font-semibold">684</div>
                <div>ккал</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(product, undefined, 2)}
      </pre>
    </div>
  );
}
