import { Cart } from "@/components/Cart";
import { Channel, Checkout } from "@next-orders/api-sdk";

type CartDrawerProps = {
  channel: Channel | null;
  checkout: Checkout | null;
  opened: boolean;
  close: () => void;
  deliveryInfoModalToggle: () => void;
};

export const CartDrawer = ({
  channel,
  checkout,
  opened,
  close,
  deliveryInfoModalToggle,
}: CartDrawerProps) => {
  return (
    <>
      <div
        className="z-30 fixed left-0 right-0 top-0 bottom-0 bg-zinc-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
        onClick={close}
        data-active={opened}
      />
      <div
        className="z-30 fixed right-0 top-0 w-full max-w-sm ml-auto h-[100dvh] p-2 m-0 shadow-none rounded-2xl translate-x-full data-[active=true]:-translate-x-0 transition-transform"
        data-active={opened}
      >
        <Cart
          checkout={checkout}
          channel={channel}
          close={close}
          deliveryInfoModalToggle={deliveryInfoModalToggle}
        />
      </div>
    </>
  );
};
