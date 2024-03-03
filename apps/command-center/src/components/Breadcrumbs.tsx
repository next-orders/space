import Link from 'next/link';
import { BackBlock } from '@/components/BackBlock';
import { getDictionary, prepareLocalizedLinks } from '@/dictionaries';
import { PageKey } from '@/lib/pages';
import { getLocale } from '@/client/locale';

type BreadcrumbsProps = {
  keys: PageKey[];
};

export const Breadcrumbs = ({ keys }: BreadcrumbsProps) => {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  // Dashboard page is always at start
  const preparedLinks = prepareLocalizedLinks(
    ['DASHBOARD', ...keys],
    dictionary,
  );

  const breadcrumbItems = preparedLinks.map((link, index) => (
    <BreadcrumbItem key={index} link={link} />
  ));

  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <nav className="hidden md:block">
        <ol role="list" className="flex flex-row">
          {breadcrumbItems}
        </ol>
      </nav>

      <BackBlock locale={locale} />
    </div>
  );
};

export type BreadcrumbLink = {
  title: string;
  href: string;
};

type BreadcrumbItemProps = {
  link: BreadcrumbLink;
};

const BreadcrumbItem = ({ link }: BreadcrumbItemProps) => (
  <li className="relative after:content-['/'] after:px-1 after:text-lg after:text-zinc-300 last:after:content-['']">
    <Link
      href={link.href}
      className="px-3 py-2 inline-block rounded-xl outline-2 outline-offset-1 outline-zinc-500 focus:ring-zinc-500 focus:border-zinc-500 hover:bg-zinc-200 hover:scale-95 duration-200 bg-zinc-100 data-[active=true]:bg-zinc-50"
      data-active={link.href === '#'}
    >
      {link.title}
    </Link>
  </li>
);
