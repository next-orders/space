import Link from 'next/link';
import {
  IconBrandGithubFilled,
  IconHearts,
  IconTableOptions,
} from '@tabler/icons-react';

export const Footer = () => {
  return (
    <div className="px-4 lg:px-12 pb-10 mt-20 text-center">
      {process.env.NEXT_PUBLIC_ENABLE_COMMAND_CENTER_DEMO && (
        <CommandCenterBlock />
      )}
      {!process.env.NEXT_PUBLIC_DISABLE_COPYRIGHT && <CopyrightBlock />}
    </div>
  );
};

const CopyrightBlock = () => {
  return (
    <>
      <div className="flex flex-row gap-1 justify-center">
        Created with <IconHearts stroke={1.5} className="text-red-500" /> by
        Nick Kosarev and team
      </div>

      <div className="mt-4">
        <Link
          href="https://github.com/next-orders/food"
          target="_blank"
          aria-label="Open GitHub repository of this project"
          className="px-3 py-3 bg-zinc-800 inline-block rounded-full text-white active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
        >
          <IconBrandGithubFilled stroke={1.5} size={24} />
        </Link>
      </div>
    </>
  );
};

const CommandCenterBlock = () => {
  return (
    <div className="mb-12 px-6 py-6 flex flex-col lg:flex-row flex-nowrap gap-4 justify-center items-center bg-white rounded-2xl">
      <div className="max-w-lg text-center lg:text-left">
        <p className="text-lg">Want to see the Business Entities shown here?</p>
        <p className="text-lg font-medium">Visit the Command Center!</p>

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
        href={process.env.NEXT_PUBLIC_COMMAND_CENTER_URL ?? '/command-center'}
        target="_blank"
        aria-label="Open Command Center"
        className="mx-auto px-8 py-4 flex flex-row flex-wrap gap-2 justify-center text-base font-medium cursor-pointer rounded-2xl bg-gradient-to-br from-violet-100 to-sky-200 active:scale-95 hover:bg-gradient-to-r lg:hover:scale-95 lg:active:scale-90 duration-200"
      >
        <IconTableOptions stroke={1.5} /> Open Command Center
      </Link>
    </div>
  );
};
