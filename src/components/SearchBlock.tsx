"use client";

import Link from "next/link";
import { getDictionary, Locale } from "@/dictionaries";
import { useSearchStore } from "@/store/search";

type SearchBlockProps = { locale: Locale };

export const SearchBlock = ({ locale }: SearchBlockProps) => {
  const query = useSearchStore((state) => state.query);
  const searchResults = useSearchStore((state) => state.searchResults);
  const isEmpty = !query;

  const showSearchResults = searchResults?.map((line) => {
    const link = `/catalog/${line.category.slug}/${line.slug}`;

    return <SearchLine key={line.id} link={link} label={line.name} />;
  });

  return (
    <div className="invisible group-hover:visible group-focus:visible group-active:visible group-focus-within:visible group-focus-visible:visible fixed top-16 left-0 w-72 bg-white px-4 py-4 rounded-b-2xl shadow-lg duration-200">
      <div className="flex flex-col gap-2">
        {isEmpty ? <SearchBlockPopular locale={locale} /> : showSearchResults}
      </div>
    </div>
  );
};

const SearchLine = ({ label, link }: { label: string; link: string }) => {
  return (
    <Link
      href={link}
      className="px-4 py-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-base cursor-pointer"
    >
      {label}
    </Link>
  );
};

const SearchBlockPopular = ({ locale }: { locale: Locale }) => {
  const { FOUND_MOST_OFTEN } = getDictionary(locale);

  return (
    <>
      <div className="font-medium">{FOUND_MOST_OFTEN}:</div>
      <SearchLine label="Four seasons" link={"/catalog/pizza/four-seasons"} />
      <SearchLine label="Mediterranean" link={"/catalog/pizza/mediterranean"} />
      <SearchLine label="Salmon" link={"/catalog/sushi/salmon"} />
      <SearchLine
        label="Philadelphia light"
        link={"/catalog/roll/philadelphia-light"}
      />
    </>
  );
};
