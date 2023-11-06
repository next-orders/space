"use client";

import { IconBike, IconClock, IconDiscount2 } from "@tabler/icons-react";
import { useUIStore } from "@/store/ui";
import { Checkout } from "@next-orders/api-sdk";

type DeliveryInfoModalProps = {
  checkout: Checkout | null;
};

export const DeliveryInfoModal = ({ checkout }: DeliveryInfoModalProps) => {
  const isDeliveryInfoModalOpened = useUIStore(
    (state) => state.isDeliveryInfoModalOpened,
  );
  const closeDeliveryInfoModal = useUIStore(
    (state) => state.closeDeliveryInfoModal,
  );

  return (
    <>
      <div
        className="z-40 fixed left-0 right-0 -top-20 -bottom-20 bg-zinc-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
        onClick={closeDeliveryInfoModal}
        data-active={isDeliveryInfoModalOpened}
      />
      <div
        className="z-40 fixed left-0 top-0 w-full max-w-md h-auto p-2 m-0 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
        data-active={isDeliveryInfoModalOpened}
      >
        <div className="mt-16 px-8 py-8 bg-white rounded-2xl">
          {checkout?.deliveryMethod === "WAREHOUSE" && <SelfPickupInfoBlock />}
          {checkout?.deliveryMethod === "DELIVERY" && <DeliveryInfoBlock />}

          <button
            onClick={closeDeliveryInfoModal}
            className="mt-4 px-5 py-3 w-full text-center text-base font-medium cursor-pointer rounded-2xl bg-zinc-200 hover:bg-zinc-300 hover:scale-95 duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

const DeliveryInfoBlock = () => {
  return (
    <>
      <div className="mb-2 text-2xl font-medium">Delivery Details</div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <IconBike stroke={1.5} />
          Courier payment
        </div>
        <div>5 $</div>
      </div>

      <div className="mt-8 mb-2 text-xl font-medium">Deliver at</div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <IconClock stroke={1.5} />
          Now: 45-60 min
        </div>
        <div></div>
      </div>

      <div className="mt-8 mb-2 text-xl font-medium">More info</div>

      <div className="mb-2 flex flex-row justify-between">
        <div>Minimum order value</div>
        <div>10 $</div>
      </div>

      <div className="mb-2 flex flex-row justify-between">
        <div>Maximum order weight</div>
        <div>20 kg</div>
      </div>
    </>
  );
};

const SelfPickupInfoBlock = () => {
  return (
    <>
      <div className="mb-2 text-2xl font-medium">Self-pickup Details</div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <IconDiscount2 stroke={1.5} />
          Discount
        </div>
        <div>10 %</div>
      </div>

      <div className="mt-8 mb-2 text-xl font-medium">Prepare at</div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <IconClock stroke={1.5} />
          Now: 15-20 min
        </div>
        <div></div>
      </div>

      <div className="mt-8 mb-2 text-xl font-medium">More info</div>

      <div className="mb-2 flex flex-row justify-between">
        <div>Minimum order value</div>
        <div>10 $</div>
      </div>
    </>
  );
};
