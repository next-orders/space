import { Drawer } from "@mantine/core";
import { Cart } from "@/components/Cart";
import { Channel, Checkout } from "@next-orders/api-sdk";

type CartDrawerProps = {
  channel: Channel | null;
  checkout: Checkout | null;
  opened: boolean;
  close: () => void;
};

export const CartDrawer = ({
  channel,
  checkout,
  opened,
  close,
}: CartDrawerProps) => {
  return (
    <Drawer.Root
      opened={opened}
      onClose={close}
      position={"right"}
      size={340}
      transitionProps={{
        transition: "slide-left",
        duration: 200,
        timingFunction: "ease-out",
      }}
    >
      <Drawer.Overlay backgroundOpacity={0.3} />
      <Drawer.Content className="h-[100dvh] p-2 m-0 shadow-none rounded-2xl">
        <Drawer.Body className="h-full p-0 m-0">
          <Cart checkout={checkout} channel={channel} />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
