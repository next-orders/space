"use client";

import { IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import type { Channel, Checkout } from "@next-orders/api-sdk";
import { useUIStore } from "@/store/ui";

type Props = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const Header = ({ channel, checkout }: Props) => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);
  const toggleNavbar = useUIStore((state) => state.toggleNavbar);
  const toggleCartDrawer = useUIStore((state) => state.toggleCartDrawer);

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

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

      <div className="mr-auto">
        <div className="flex flex-row gap-2 items-center">
          <IconSearch stroke={1.5} />
          <input placeholder="Find a product" />
        </div>
      </div>

      <div className="block xl:hidden font-medium">
        <button
          onClick={toggleCartDrawer}
          className="w-full px-4 py-3 flex flex-row gap-2 justify-between items-center rounded-xl cursor-pointer hover:scale-95 duration-200"
          style={{ backgroundColor, backgroundImage }}
        >
          <span className="font-medium">Cart</span>
          <div>
            {checkout?.totalPrice} <span className="ml-0 text-sm">$</span>
          </div>
        </button>
      </div>
    </div>
  );
};
