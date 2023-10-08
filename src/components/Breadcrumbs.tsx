import Link from "next/link";

type Links = {
  title: string;
  href: string;
};

type Props = {
  links: Links[];
};

export const Breadcrumbs = ({ links }: Props) => {
  const crumbs = links.map((link, index) => {
    return (
      <li
        key={index}
        className="after:content-['/'] after:px-2 last:after:content-['']"
      >
        <Link href={link.href}>{link.title}</Link>
      </li>
    );
  });

  return (
    <nav className="hidden lg:block">
      <ol role="list" className="flex flex-row">
        {crumbs}
      </ol>
    </nav>
  );
};
