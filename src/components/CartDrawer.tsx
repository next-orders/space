import { Drawer } from "@mantine/core";
import { Cart } from "@/components/Cart";
import { Checkout } from "@next-orders/api-sdk";

type CartDrawerProps = {
  checkout: Checkout | null;
  opened: boolean;
  close: () => void;
};

export const CartDrawer = ({ checkout, opened, close }: CartDrawerProps) => {
  return (
    <Drawer.Root
      opened={opened}
      onClose={close}
      position={"right"}
      size={320}
      transitionProps={{
        transition: "slide-left",
        duration: 200,
        timingFunction: "ease-out",
      }}
    >
      <Drawer.Overlay backgroundOpacity={0.3} />
      <Drawer.Content className="h-screen p-2 m-0 shadow-none rounded-2xl">
        <Drawer.Body className="h-full p-0 m-0">
          <Cart checkout={checkout} />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
