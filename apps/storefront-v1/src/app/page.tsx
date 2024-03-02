import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import type { CurrencyCode, MenuCategory } from '@next-orders/api-sdk';
import {
  GetAllMenusInChannel,
  GetChannel,
  GetCheckout,
  GetLocale,
  GetMenu,
  GetProductsInCategory,
} from '@/client/api';
import { ProductCard } from '@/components/ProductCard';
import { MainShell } from '@/components/MainShell';
import { getDictionary, Locale } from '@/dictionaries';
import { ChannelEmptyBlock } from '@/components/ChannelEmptyBlock';

export default async function Page() {
  const [channel, menus, checkout, locale] = await Promise.all([
    GetChannel(),
    GetAllMenusInChannel(),
    GetCheckout(),
    GetLocale(),
  ]);

  if (!channel || !menus) {
    return <ChannelEmptyBlock locale={locale} />;
  }

  const menu = await GetMenu(menus[0]?.id || '');
  if (!menu) {
    return <ChannelEmptyBlock locale={locale} />;
  }

  const categories = menu?.categories?.map(async (category) => (
    <CategoryBlock
      key={category.id}
      category={category}
      locale={channel.languageCode}
      currencyCode={channel.currencyCode}
    />
  ));

  return (
    <MainShell channel={channel} menu={menu} checkout={checkout}>
      <h1 className="mb-2 text-3xl font-medium">{channel?.name}</h1>
      <div className="mb-6">{channel?.description}</div>

      {categories}
    </MainShell>
  );
}

type CategoryBlockProps = {
  category: MenuCategory;
  locale: Locale;
  currencyCode: CurrencyCode;
};

const CategoryBlock = async ({
  category,
  locale,
  currencyCode,
}: CategoryBlockProps) => {
  const { OPEN_CATEGORY_BUTTON } = getDictionary(locale);

  // Load Products in this category
  const products = await GetProductsInCategory(category.id);
  if (!products?.length) {
    return null;
  }

  // Limit 6 products
  const showProducts = products.slice(0, 6).map((product) => {
    const productUrl = '/catalog/' + product.category.slug + '/' + product.slug;

    return (
      <ProductCard
        key={product.id}
        locale={locale}
        productUrl={productUrl}
        currencyCode={currencyCode}
        {...product}
      />
    );
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2">
        <h2 className="text-2xl md:text-3xl font-medium">{category.name}</h2>

        <Link
          href={`/catalog/${category.slug}`}
          className="px-5 py-3 flex flex-row gap-2 text-base font-normal cursor-pointer rounded-2xl bg-zinc-200 active:scale-95 hover:bg-zinc-300 lg:hover:scale-95 lg:active:scale-90 duration-200"
        >
          {OPEN_CATEGORY_BUTTON} <IconArrowRight stroke={1.5} />
        </Link>
      </div>
      <div
        key={category.id}
        className="mt-4 mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2"
      >
        {showProducts}
      </div>
    </>
  );
};
