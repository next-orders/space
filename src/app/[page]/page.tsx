import { GetCategories } from "@/server/actions";
import { notFound } from "next/navigation";

type Props = {
  params: { page: string };
};

export default async function Page({ params }: Props) {
  const categories = await GetCategories();
  const possibleLinks = categories.map((category) => category.link);

  if (!possibleLinks.includes("/" + params.page)) {
    notFound();
  }

  const CardExample = () => {
    return (
      <div className="bg-white rounded-2xl h-auto w-auto p-3 cursor-pointer">
        <div className="w-full aspect-square bg-zinc-100 rounded-xl text-center text-slate-300">
          Фото
        </div>
        <div className="mt-2 text-xl font-medium">150 ₽</div>
        <div className="font-light leading-tight">Название пиццы</div>
        <div className="mt-2 font-light text-zinc-400">размер, вес</div>

        <div className="flex flex-row gap-2 items-center justify-between mt-2 w-full h-12 bg-zinc-100 rounded-xl">
          <div className="w-full text-center text-2xl font-light">+</div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="text-3xl font-semibold">{params.page}</h1>
      <div>Здесь все товары из этой категории</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
      </div>
    </div>
  );
}
