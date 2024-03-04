'use client';

import { Cart } from './Cart';
import { Channel, Checkout } from '@next-orders/api-sdk';
import { useUIStore } from '../store/ui';

type CartDrawerProps = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const CartDrawer = ({ channel, checkout }: CartDrawerProps) => {
  const isCartDrawerOpened = useUIStore((state) => state.isCartDrawerOpened);
  const closeCartDrawer = useUIStore((state) => state.closeCartDrawer);

  return (
    <>
      <button
        className="z-30 fixed left-0 right-0 -top-20 -bottom-20 appearance-none bg-zinc-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
        onClick={closeCartDrawer}
        data-active={isCartDrawerOpened}
      />
      <div
        className="z-30 fixed right-0 top-0 w-full max-w-sm ml-auto h-[100dvh] p-2 m-0 shadow-none rounded-2xl translate-x-full data-[active=true]:-translate-x-0 transition-transform"
        data-active={isCartDrawerOpened}
      >
        <Cart checkout={checkout} channel={channel} />
      </div>
    </>
  );
};
