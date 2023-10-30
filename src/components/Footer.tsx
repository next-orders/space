import Link from "next/link";
import {
  IconBrandGithubFilled,
  IconHearts,
  IconTableOptions,
} from "@tabler/icons-react";

export const Footer = () => {
  return (
    <div className="px-4 pb-10 mt-4 text-center">
      <CommandCenterBlock />

      <div className="flex flex-row gap-1 justify-center">
        Created with <IconHearts stroke={1.5} className="text-red-500" /> by
        Nick Kosarev and team
      </div>

      <div className="mt-4">
        <Link
          href={"https://github.com/next-orders/v1"}
          target="_blank"
          className="px-3 py-3 bg-zinc-800 inline-block rounded-full text-white hover:scale-110 duration-200"
        >
          <IconBrandGithubFilled stroke={1.5} size={24} />
        </Link>
      </div>
    </div>
  );
};

const CommandCenterBlock = () => {
  return (
    <div className="mb-12 px-6 py-6 flex flex-col lg:flex-row flex-nowrap gap-4 justify-center items-center bg-white rounded-2xl">
      <div className="max-w-lg text-center lg:text-left">
        <p className="text-lg">Want to see the Business Entities shown here?</p>
        <p className="text-lg font-semibold">Visit the Command Center!</p>

        <ul className="mt-4 list-none list-inside leading-relaxed">
          <li>
            <span className="mr-2">🍔</span> Working with orders and client base
          </li>
          <li>
            <span className="mr-2">🍕</span> Editing pages, products, categories
          </li>
          <li>
            <span className="mr-2">🍰</span> Also developed as Open Source
          </li>
        </ul>
      </div>

      <Link
        href={"/command-center"}
        target="_blank"
        className="mx-auto px-8 py-4 flex flex-row flex-wrap gap-2 justify-center text-base font-medium cursor-pointer rounded-2xl bg-gradient-to-br from-violet-200 to-sky-200 hover:bg-gradient-to-r hover:scale-95 duration-200"
      >
        <IconTableOptions stroke={1.5} /> Open Command Center
      </Link>
    </div>
  );
};
