import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { GetChannelById, GetMenusInChannel } from '../../../../client/api';
import { Menu, MenuCategory } from '@next-orders/api-sdk';
import { getDictionary, Locale } from '../../../../dictionaries';
import { getLocale } from '../../../../client/locale';
import { IconCategory } from '@tabler/icons-react';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const channel = await GetChannelById(params.id);
  if (!channel) {
    notFound();
  }

  const menus = await GetMenusInChannel(channel.id);

  const locale = getLocale();
  const { CHANNEL_PAGE_LABEL, MENUS_IN_THIS_CHANNEL_LABEL } =
    getDictionary(locale);

  const showMenus = menus?.map((menu) => (
    <MenuCard key={menu.id} menu={menu} locale={locale} />
  ));

  return (
    <>
      <Breadcrumbs keys={['CHANNELS', 'CHANNEL_PAGE']} />

      <h1 className="mb-2 text-3xl font-semibold">{CHANNEL_PAGE_LABEL}</h1>

      <h2 className="mt-8 text-xl font-semibold">
        {MENUS_IN_THIS_CHANNEL_LABEL}
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2">
        {showMenus}
      </div>
    </>
  );
}

type MenuCardProps = {
  menu: Menu;
  locale: Locale;
};

const MenuCard = ({ menu, locale }: MenuCardProps) => {
  const { OPEN_BUTTON } = getDictionary(locale);

  const CategoryBlock = ({ category }: { category: MenuCategory }) => {
    return (
      <div className="inline-block mr-2 mb-2 px-4 py-2 bg-zinc-100 rounded-2xl">
        {category.name}
      </div>
    );
  };

  const showCategories = menu.categories.map((category) => (
    <CategoryBlock key={category.id} category={category} />
  ));

  return (
    <Link href={`/menu/${menu.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto px-4 py-6 cursor-pointer hover:scale-95 duration-200 group">
        <IconCategory
          stroke={1.5}
          className="mx-auto mt-4 mb-2 w-14 h-14 text-zinc-500"
        />

        <div className="text-2xl font-semibold leading-tight text-center">
          {menu.name}
        </div>

        <div className="mt-6 text-center">{showCategories}</div>

        <div className="mt-4 px-6 py-4 font-medium text-center bg-zinc-100 rounded-xl group-hover:bg-teal-200 duration-200">
          {OPEN_BUTTON}
        </div>
      </div>
    </Link>
  );
};
