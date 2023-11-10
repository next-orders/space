"use client";

import Link from "next/link";
import { IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import type { Channel, Checkout } from "@next-orders/api-sdk";
import { useUIStore } from "@/store/ui";
import { useSearchStore } from "@/store/search";

type HeaderProps = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const Header = ({ channel, checkout }: HeaderProps) => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);
  const toggleNavbar = useUIStore((state) => state.toggleNavbar);
  const toggleCartDrawer = useUIStore((state) => state.toggleCartDrawer);

  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  const handleSearchInput = () => {
    console.log("Search!");
  };

  const cartNumber = checkout?.lines.length;
  const isCartEmpty = !checkout?.lines.length;

  return (
    <div className="z-10 w-full h-full px-4 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
      <div className="mr-2 md:mr-0 flex justify-center items-center justify-items-center md:hidden h-full hover:scale-110 transition duration-200">
        <button
          aria-label="Close Navigation"
          data-active={isNavbarOpened}
          onClick={toggleNavbar}
          className="hidden data-[active=true]:block"
        >
          <IconX stroke={1.5} className="w-8 h-8" />
        </button>
        <button
          aria-label="Open Navigation"
          data-active={!isNavbarOpened}
          onClick={toggleNavbar}
          className="hidden data-[active=true]:block"
        >
          <IconMenu2 stroke={1.5} className="w-8 h-8" />
        </button>
      </div>

      <div className="relative mr-auto group">
        <div className="flex flex-row gap-1 items-center">
          <IconSearch stroke={1.5} />
          <input
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            type="text"
            placeholder="Find a product"
            onInput={handleSearchInput}
            className="px-2 py-2 w-32 md:w-56 group-focus:bg-zinc-400 rounded-xl"
          />
        </div>

        <SearchBlock />
      </div>

      {!isCartEmpty && (
        <div className="block xl:hidden font-medium">
          <button
            onClick={toggleCartDrawer}
            className="w-full px-4 py-3 flex flex-row gap-2 justify-between items-center rounded-xl cursor-pointer hover:scale-95 duration-200"
            style={{ backgroundColor, backgroundImage }}
          >
            <span className="font-medium">Cart</span>
            <div className="rounded-full bg-white w-6 h-6 text-center">
              {cartNumber}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

const SearchBlock = () => {
  const search = useSearchStore((state) => state.search);

  const Line = ({ label }: { label: string }) => {
    return (
      <Link
        href={"/catalog/roll/crab-with-salmon"}
        className="px-4 py-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-base cursor-pointer"
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="invisible group-hover:visible group-focus:visible group-active:visible group-focus-within:visible group-focus-visible:visible fixed top-16 left-0 w-72 bg-white px-4 py-4 rounded-b-2xl shadow-lg">
      <div className="flex flex-col gap-2">
        <input type="text" name="test" />
        {search && <Line label={search} />}

        <div className="mt-2 font-medium">More often searched:</div>
        <Line label="Salmon" />
        <Line label="Creamy Salmon" />
        <Line label="Salmon Maki" />
        <Line label="Crab with salmon" />
      </div>
    </div>
  );
};
