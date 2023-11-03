import { Burger, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Channel, Checkout } from "@next-orders/api-sdk";

type Props = {
  channel: Channel | null;
  checkout: Checkout | null;
  isNavbarOpened: boolean;
  toggle: () => void;
  cartDrawerToggle: () => void;
};

export const Header = ({
  channel,
  checkout,
  isNavbarOpened,
  toggle,
  cartDrawerToggle,
}: Props) => {
  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  return (
    <div className="z-10 w-full h-full px-4 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
      <div className="mr-2 md:mr-0 flex justify-center items-center justify-items-center h-full hover:scale-110 transition duration-200">
        <Burger
          opened={isNavbarOpened}
          onClick={toggle}
          size="md"
          aria-label="Navigation"
          hiddenFrom="sm"
        />
      </div>

      <div className="mr-auto">
        <div className="flex flex-row gap-2 items-center">
          <IconSearch stroke={1.5} />
          <Input placeholder="Find a product" />
        </div>
      </div>

      <div className="block xl:hidden font-medium">
        <button
          onClick={cartDrawerToggle}
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
