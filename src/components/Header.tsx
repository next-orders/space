import { Burger, Button, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  isNavbarOpened: boolean;
  toggle: () => void;
};

export const Header = ({ isNavbarOpened, toggle }: Props) => {
  return (
    <div className="w-full h-full px-4 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
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

      <Button
        variant="filled"
        size="md"
        leftSection={<span className="font-medium">Cart</span>}
        radius="md"
        className="px-4 py-2 text-white font-semibold bg-emerald-500 hover:bg-emerald-600"
      >
        15.18 <span className="ml-1 text-sm">$</span>
      </Button>
    </div>
  );
};
