"use client";

import { IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import type { Channel, Checkout } from "@next-orders/api-sdk";
import { useUIStore } from "@/store/ui";
import { useSearchStore } from "@/store/search";
import { getDictionary } from "@/dictionaries";
import { SearchBlock } from "@/components/SearchBlock";

type HeaderProps = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const Header = ({ channel, checkout }: HeaderProps) => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);
  const toggleNavbar = useUIStore((state) => state.toggleNavbar);
  const toggleCartDrawer = useUIStore((state) => state.toggleCartDrawer);

  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  const handleSearchInput = () => {
    console.log("Search!");
  };

  const cartNumber = checkout?.lines.length;
  const isCartEmpty = !checkout?.lines.length;

  const locale = channel?.languageCode || "EN";
  const { SEARCH_PLACEHOLDER, CART_LABEL } = getDictionary(locale);

  return (
    <div className="z-10 w-full h-full px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
      <div className="mr-2 md:mr-0 flex justify-center items-center justify-items-center md:hidden h-full lg:hover:scale-110 transition duration-200">
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
            type="text"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder={SEARCH_PLACEHOLDER}
            onInput={handleSearchInput}
            className="px-2 py-2 w-32 md:w-56 group-focus:bg-zinc-400 rounded-xl"
          />
        </div>

        <SearchBlock locale={locale} />
      </div>

      {!isCartEmpty && (
        <div className="block xl:hidden font-medium">
          <button
            onClick={toggleCartDrawer}
            className="w-full px-4 py-3 flex flex-row gap-2 justify-between items-center rounded-xl cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
            style={{ backgroundColor, backgroundImage }}
          >
            <span className="font-medium">{CART_LABEL}</span>
            <div className="rounded-full bg-white w-6 h-6 text-center">
              {cartNumber}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
