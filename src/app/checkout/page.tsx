import React from "react";
import Link from "next/link";
import { IconClock } from "@tabler/icons-react";
import { GetChannel, GetCheckout, GetProductsInCategory } from "@/client/api";
import { CheckoutLineBlock } from "@/components/CheckoutLineBlock";
import { ProductCard } from "@/components/ProductCard";

export default async function Page() {
  const [checkout, channel] = await Promise.all([
    GetCheckout("123"),
    GetChannel(),
  ]);

  const items = checkout?.lines?.map((line) => (
    <CheckoutLineBlock key={line.id} {...line} />
  ));

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  // Load Products for additional sales
  const products = await GetProductsInCategory("hcs9nywdrigyeqjljnkohpl0"); // Sushi

  // Limit 6 products
  const showProducts = products?.slice(0, 6).map((product) => {
    const productUrl = "/catalog/" + product.category.slug + "/" + product.slug;

    return (
      <ProductCard key={product.id} productUrl={productUrl} {...product} />
    );
  });

  return (
    <>
      <h1 className="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-full md:col-span-7">
          <Block>
            <h2 className="mb-2 text-xl md:text-2xl font-medium">
              Delivery conditions
            </h2>

            <div className="px-4 py-2 bg-zinc-100 rounded-2xl inline-block">
              <div className="font-medium">Delivery</div>
              <div>5$</div>
            </div>

            <div className="w-full mt-4">
              <h3 className="mb-2 text-lg md:text-xl font-medium">
                Indicate your address
              </h3>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="px-4 py-3 mb-2 w-full border border-zinc-200 rounded-2xl"
              />

              <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2">
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apt./office"
                  className="px-4 py-3 mb-2 border border-zinc-200 rounded-2xl"
                />

                <input
                  type="text"
                  name="doorphone"
                  placeholder="Doorphone"
                  className="px-4 py-3 mb-2 border border-zinc-200 rounded-2xl"
                />

                <input
                  type="text"
                  name="entrance"
                  placeholder="Entrance"
                  className="px-4 py-3 mb-2 border border-zinc-200 rounded-2xl"
                />

                <input
                  type="text"
                  name="floor"
                  placeholder="Floor"
                  className="px-4 py-3 mb-2 border border-zinc-200 rounded-2xl"
                />
              </div>

              <input
                type="text"
                name="comment"
                placeholder="Comment"
                className="px-4 py-3 mb-2 w-full border border-zinc-200 rounded-2xl"
              />
            </div>

            <h2 className="mt-4 mb-2 text-xl md:text-2xl font-medium">
              Delivery time
            </h2>

            <div className="flex flex-row gap-2">
              <IconClock stroke={1.5} />
              Now: 45-60 min
            </div>
          </Block>

          <Block>
            <h2 className="mb-4 text-xl md:text-2xl font-medium">You order</h2>

            {items}
          </Block>
        </div>

        <div className="col-span-full md:col-span-5 h-fit sticky top-20">
          <Block>
            <h2 className="mb-4 text-xl md:text-2xl font-medium">Total</h2>

            <div className="mb-4">
              <div className="mb-2 flex flex-row justify-between text-lg">
                <div>Price of goods</div>
                <div>{checkout?.totalPrice} $</div>
              </div>
              <div className="mb-2 flex flex-row justify-between text-lg">
                <div>Cost of delivery</div>
                <div>{checkout?.shippingPrice} $</div>
              </div>

              <div className="mt-4 mb-6">
                <div className="text-base text-zinc-500">
                  Do you have a promo code?
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-nowrap gap-4 items-center">
              <Link
                href={"#"}
                className="w-full px-4 py-4 text-lg font-medium text-center rounded-xl cursor-pointer hover:scale-95 duration-200"
                style={{ backgroundColor, backgroundImage }}
              >
                Create Order
              </Link>

              <div className="font-medium text-right text-xl min-w-[6rem]">
                {checkout?.totalPrice} <span className="text-base">$</span>
              </div>
            </div>
          </Block>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="mb-2 md:mb-4 text-2xl md:text-3xl font-medium">
          Anything else?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
          {showProducts}
        </div>
      </div>
    </>
  );
}

type BlockProps = {
  children: React.ReactNode;
};

const Block = ({ children }: BlockProps) => {
  return (
    <div className="mb-6 px-4 py-5 md:px-6 md:py-6 bg-white rounded-3xl">
      {children}
    </div>
  );
};
