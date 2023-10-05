export default function Page() {
  const CardExample = () => {
    return (
      <div className="bg-white rounded-3xl h-auto w-auto p-3 cursor-pointer">
        <div className="w-full aspect-square bg-zinc-100 rounded-2xl text-center text-slate-300">
          Photo
        </div>
        <div className="mt-2 text-xl font-normal">14$</div>
        <div className="font-light leading-tight">Item description</div>
        <div className="mt-2 font-light text-zinc-400">size, weight</div>

        <div className="flex flex-row gap-2 items-center justify-between mt-2 w-full h-12 bg-zinc-100 rounded-2xl">
          <div className="w-full text-center text-2xl font-light">+</div>
        </div>
      </div>
    );
  };

  return (
    <main className="mb-20 px-4 col-span-12 lg:col-span-10 xl:col-span-7 min-h-screen">
      <h1 className="text-3xl font-semibold">Title</h1>
      <div>Cool Ecommerce</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
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
    </main>
  );
}
