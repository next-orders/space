import Link from "next/link";
import { GetChannel } from "@/client/api";
import { BackBlock } from "@/components/BackBlock";

export type BreadcrumbLink = {
  title: string;
  href: string;
};

type BreadcrumbsProps = {
  links: BreadcrumbLink[];
};

export const Breadcrumbs = async ({ links }: BreadcrumbsProps) => {
  const channel = await GetChannel();
  const locale = channel?.languageCode || "EN";

  const breadcrumbItems = links.map((link, index) => (
    <BreadcrumbItem key={index} link={link} />
  ));

  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <nav className="hidden lg:block">
        <ol
          role="list"
          className="flex flex-row flex-wrap gap-y-2 items-center"
        >
          {breadcrumbItems}
        </ol>
      </nav>

      <BackBlock locale={locale} />
    </div>
  );
};

type BreadcrumbItemProps = {
  link: BreadcrumbLink;
};

const BreadcrumbItem = ({ link }: BreadcrumbItemProps) => (
  <li className="relative max-w-[20rem] after:content-['/'] after:px-1 after:text-lg after:text-zinc-300 last:after:content-['']">
    <Link
      href={link.href}
      className="px-3 py-2 inline-block leading-tight rounded-xl lg:hover:bg-zinc-200 lg:hover:scale-95 active:scale-90 duration-200 bg-zinc-50 data-[active=true]:bg-zinc-50"
      data-active={link.href === "#"}
    >
      {link.title}
    </Link>
  </li>
);
