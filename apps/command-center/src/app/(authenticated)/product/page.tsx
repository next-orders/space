import Link from "next/link";
import Image from "next/image";
import { IconCheese, IconChefHat, IconPaperBag } from "@tabler/icons-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/client/locale";
import StaticRecipeBook from "@/../public/static/recipe-book.png";
import StaticRecipeList from "@/../public/static/recipe-list.png";

export default async function Page() {
  const locale = getLocale();
  const {
    OPEN_BUTTON,
    PRODUCTION_LABEL,
    PRODUCTION_DESCRIPTION,
    READY_LABEL,
    READY_DESCRIPTION,
    INGREDIENT_LABEL,
    INGREDIENT_DESCRIPTION,
    PRODUCTS_LABEL,
  } = getDictionary(locale);

  return (
    <>
      <Breadcrumbs keys={["PRODUCTS"]} />

      <h1 className="mb-2 text-3xl font-semibold">{PRODUCTS_LABEL}</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href={"/product/production"}
          className="px-4 py-4 flex flex-col justify-between bg-zinc-50 rounded-2xl text-center cursor-pointer hover:scale-95 duration-200 group"
        >
          <div className="mt-4">
            <IconChefHat
              stroke={1.5}
              className="mx-auto mb-2 w-14 h-14 text-violet-500"
            />
            <div className="text-2xl font-semibold">{PRODUCTION_LABEL}</div>
            <p>{PRODUCTION_DESCRIPTION}</p>
          </div>

          <div>
            <div className="mt-4 mb-4 text-2xl font-semibold text-zinc-400">
              35
            </div>
            <div className="px-6 py-4 font-medium bg-zinc-100 rounded-xl group-hover:bg-violet-200 duration-200">
              {OPEN_BUTTON}
            </div>
          </div>
        </Link>

        <Link
          href={"/product/ready"}
          className="px-4 py-4 flex flex-col justify-between bg-zinc-50 rounded-2xl text-center cursor-pointer hover:scale-95 duration-200 group"
        >
          <div className="mt-4">
            <IconPaperBag
              stroke={1.5}
              className="mx-auto mb-2 w-14 h-14 text-blue-500"
            />
            <div className="text-2xl font-semibold">{READY_LABEL}</div>
            <p>{READY_DESCRIPTION}</p>
          </div>

          <div>
            <div className="mt-4 mb-4 text-2xl font-semibold text-zinc-400">
              24
            </div>
            <div className="px-6 py-4 font-medium bg-zinc-100 rounded-xl group-hover:bg-blue-200 duration-200">
              {OPEN_BUTTON}
            </div>
          </div>
        </Link>

        <Link
          href={"/product/ingredient"}
          className="px-4 py-4 flex flex-col justify-between bg-zinc-50 rounded-2xl text-center cursor-pointer hover:scale-95 duration-200 group"
        >
          <div className="mt-4">
            <IconCheese
              stroke={1.5}
              className="mx-auto mb-2 w-14 h-14 text-green-500"
            />
            <div className="text-2xl font-semibold">{INGREDIENT_LABEL}</div>
            <p>{INGREDIENT_DESCRIPTION}</p>
          </div>

          <div>
            <div className="mt-4 mb-4 text-2xl font-semibold text-zinc-400">
              46
            </div>
            <div className="px-6 py-4 font-medium bg-zinc-100 rounded-xl group-hover:bg-green-200 duration-200">
              {OPEN_BUTTON}
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-24 text-center max-w-xl mx-auto">
        <Image
          src={StaticRecipeBook}
          width={StaticRecipeBook.width}
          height={StaticRecipeBook.height}
          alt=""
          className="mx-auto mb-4 w-16 h-16"
        />
        <h2 className="mb-4 text-lg font-semibold">
          Ok, let&apos;s understand a little theory
        </h2>
        <p className="text-left">
          For ease of understanding, we will divide goods into <b>abstract</b>{" "}
          and <b>real</b>. In this section you manage abstract products. They
          come in three types: to be produced, finished goods, and ingredients.
        </p>

        <Image
          src={StaticRecipeList}
          width={StaticRecipeList.width}
          height={StaticRecipeList.height}
          alt=""
          className="mx-auto mt-14 mb-4 w-16 h-16"
        />
        <h2 className="mb-4 text-lg font-semibold">
          Some questions you can have
        </h2>

        <div className="mb-8 text-left">
          <p className="mb-2 font-semibold">
            Can you explain the distinction between abstract and real goods in
            this context?
          </p>
          <p className="mb-2">
            An abstract product is a product that does not exist in reality. It
            is necessary to create future connections and to build
            understandable reports. It has no cost, specific weight or size.
          </p>
          <p className="mb-2">
            The real product is the product that you sell in sales channels. It
            has a price, a specific size.
          </p>
        </div>

        <div className="mb-8 text-left">
          <p className="mb-2 font-semibold">
            Can you provide an example of each type of good?
          </p>
          <p className="mb-2">
            Products to be produced: pizza Carbonara, Philadelphia roll, Seafood
            wok.
          </p>
          <p className="mb-2">
            Products that are ready: Fanta soda, soy sauce (portioned, for
            sushi), cheesecake (portioned, already prepared by another kitchen).
          </p>
          <p className="mb-2">
            Ingredients for the production chain: mozzarella cheese, salmon,
            dough.
          </p>
        </div>

        <div className="mb-8 text-left">
          <p className="mb-2 font-semibold">
            Why is it important to manage abstract products?
          </p>
          <p className="mb-2">
            When there are many sales channels, the number of real goods will
            increase dramatically. In order not to get confused, let&apos;s
            create a top, abstract level, which will become the basis for
            creating all connections.
          </p>
          <p className="mb-2">
            Let&apos;s take an example. Abstract Production product: Pepperoni
            pizza. We will create real branches from it:
          </p>
          <ul className="mb-2 list-disc list-inside">
            <li>Pepperoni pizza 20 cm</li>
            <li>Pepperoni pizza 30 cm with fluffy dough</li>
            <li>Pepperoni pizza 40 cm with thin dough</li>
            <li>... a bunch of other options</li>
          </ul>
          <p className="mb-2">
            We will build the final reports at the abstraction level, using data
            from real goods.
          </p>
        </div>
      </div>
    </>
  );
}
