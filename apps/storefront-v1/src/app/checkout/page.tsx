import React from 'react';
import Link from 'next/link';
import { GetChannel, GetCheckout, GetProductsInCategory } from '@/client/api';
import { CheckoutLineBlock } from '@/components/CheckoutLineBlock';
import { ProductCard } from '@/components/ProductCard';
import { getDictionary } from '@/dictionaries';
import { getCurrencySign } from '@/client/helpers';
import { DeliveryConditionsBlock } from '@/app/checkout/DeliveryConditionsBlock';

export default async function Page() {
  const [checkout, channel] = await Promise.all([GetCheckout(), GetChannel()]);

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  const countryCode = channel?.countryCode ?? 'US';
  const currencyCode = channel?.currencyCode ?? 'USD';
  const locale = channel?.languageCode ?? 'EN';
  const {
    CHECKOUT_LABEL,
    COST_OF_DELIVERY_LABEL,
    YOU_ORDER_LABEL,
    TOTAL_LABEL,
    HAVE_A_PROMO_LABEL,
    CREATE_ORDER_LABEL,
    ANYTHING_ELSE_LABEL,
    PRICE_OF_GOODS_LABEL,
    PAYMENT_METHOD_LABEL,
  } = getDictionary(locale);

  const items = checkout?.lines?.map((line) => (
    <CheckoutLineBlock
      key={line.id}
      locale={locale}
      currencyCode={channel?.currencyCode}
      {...line}
    />
  ));

  // Load Products for additional sales
  const products = await GetProductsInCategory('hcs9nywdrigyeqjljnkohpl0'); // Sushi

  // Limit 6 products
  const showAdditionalProducts = products?.slice(0, 6).map((product) => {
    const productUrl = '/catalog/' + product.category.slug + '/' + product.slug;

    return (
      <ProductCard
        key={product.id}
        locale={locale}
        productUrl={productUrl}
        currencyCode={channel?.currencyCode}
        {...product}
      />
    );
  });
  const isAdditionalProductsShown =
    showAdditionalProducts && showAdditionalProducts?.length > 0;

  const currencySign = getCurrencySign(channel?.currencyCode);

  return (
    <>
      <h1 className="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium">
        {CHECKOUT_LABEL}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-full md:col-span-7">
          <DeliveryConditionsBlock
            locale={locale}
            currencyCode={currencyCode}
            countryCode={countryCode}
          />

          <Block>
            <h2 className="mb-4 text-xl md:text-2xl font-medium">
              {YOU_ORDER_LABEL}
            </h2>
            {items}
          </Block>
        </div>

        <div className="col-span-full md:col-span-5 h-fit sticky top-20">
          <Block>
            <h3 className="mb-16 text-lg md:text-xl font-medium">
              {PAYMENT_METHOD_LABEL}
            </h3>

            <h3 className="mb-2 text-lg md:text-xl font-medium">
              {TOTAL_LABEL}
            </h3>

            <div className="mb-4">
              <div className="mb-2 flex flex-row justify-between text-lg">
                <div>{PRICE_OF_GOODS_LABEL}</div>
                <div className="tracking-tight">
                  {checkout?.totalPrice}
                  <span className="pl-1 text-sm">{currencySign}</span>
                </div>
              </div>
              <div className="mb-2 flex flex-row justify-between text-lg">
                <div>{COST_OF_DELIVERY_LABEL}</div>
                <div className="tracking-tight">
                  {checkout?.shippingPrice}
                  <span className="pl-1 text-sm">{currencySign}</span>
                </div>
              </div>

              <div className="mt-4 mb-6">
                <div className="text-base text-zinc-500">
                  {HAVE_A_PROMO_LABEL}?
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-nowrap gap-4 items-center">
              <Link
                href={'#'}
                className="w-full px-4 py-4 text-lg font-normal text-center rounded-xl cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
                style={{ backgroundColor, backgroundImage }}
              >
                {CREATE_ORDER_LABEL}
              </Link>

              <div className="font-medium text-right text-xl min-w-[5rem] tracking-tight">
                {checkout?.totalPrice}
                <span className="pl-1 text-base">{currencySign}</span>
              </div>
            </div>
          </Block>
        </div>
      </div>

      {isAdditionalProductsShown && (
        <div className="mt-4">
          <h2 className="mb-2 md:mb-4 text-2xl md:text-3xl font-medium">
            {ANYTHING_ELSE_LABEL}?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
            {showAdditionalProducts}
          </div>
        </div>
      )}
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
