import { IconMinus, IconPlus } from "@tabler/icons-react";

export const Cart = () => {
  const ExampleItem = () => {
    return (
      <div className="mb-4 flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-16 min-w-[3rem] aspect-square bg-zinc-100 rounded-xl text-center text-sm text-slate-300">
            Фото
          </div>

          <div>
            <div className="font-light text-sm leading-tight">
              Название товара
            </div>
            <div className="mt-1 flex flex-row gap-2">
              <div className="text-sm font-medium">450 ₽</div>
              <div className="text-sm text-zinc-400 font-light">200 гр</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center bg-zinc-100 w-24 min-w-[6rem] rounded-2xl px-2 py-2">
          <div className="text-2xl font-light leading-none">
            <IconMinus stroke={1.5} className="w-5 h-5" />
          </div>
          <div className="text-sm">1</div>
          <div className="text-2xl font-light leading-none">
            <IconPlus stroke={1.5} className="w-5 h-5" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white h-full">
      <div className="px-4 py-4 h-full flex flex-col justify-between">
        <div>
          <p className="mb-4 text-2xl font-semibold">Корзина</p>

          <ExampleItem />
          <ExampleItem />
          <ExampleItem />
        </div>

        <div className="px-4 py-4 flex flex-row justify-between items-center bg-emerald-300 rounded-xl cursor-pointer">
          <div className="font-medium">Хорошо, далее</div>
          <div className="font-semibold text-lg">1290 ₽</div>
        </div>
      </div>
    </div>
  );
};
