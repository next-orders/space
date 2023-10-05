import { IconMinus, IconPlus } from "@tabler/icons-react";

export const Cart = () => {
  const ExampleItem = () => {
    return (
      <div className="mb-4 flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-16 aspect-square bg-zinc-100 rounded-2xl text-center text-sm text-slate-300">
            Photo
          </div>

          <div>
            <div className="font-light text-sm">Item title</div>
            <div className="mt-1 flex flex-row gap-2">
              <div className="text-sm">4.55$</div>
              <div className="text-sm text-zinc-400 font-light">200g</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center bg-zinc-100 w-24 rounded-2xl px-2 py-2">
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
    <aside className="hidden xl:block col-span-0 xl:col-span-3 h-[88vh] max-w-[20rem] bg-white rounded-3xl sticky top-24">
      <div className="px-4 py-4 h-full flex flex-col justify-between">
        <div>
          <p className="mb-4 text-2xl font-semibold">Cart</p>

          <ExampleItem />
          <ExampleItem />
          <ExampleItem />
        </div>

        <div className="px-4 py-4 flex flex-row justify-between items-center bg-emerald-300 rounded-2xl cursor-pointer">
          <div className="font-medium">OK, go next</div>
          <div className="font-semibold text-lg">52.95$</div>
        </div>
      </div>
    </aside>
  );
};
