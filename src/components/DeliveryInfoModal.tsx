import { IconBike, IconClock } from "@tabler/icons-react";

type DeliveryInfoModalProps = {
  opened: boolean;
  close: () => void;
};

export const DeliveryInfoModal = ({
  opened,
  close,
}: DeliveryInfoModalProps) => {
  return (
    <div>
      <div
        className="z-40 fixed left-0 right-0 top-0 bottom-0 bg-zinc-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
        onClick={close}
        data-active={opened}
      />
      <div
        className="z-40 fixed left-0 top-0 w-full max-w-md h-auto p-2 m-0 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
        data-active={opened}
      >
        <div className="mt-16 px-8 py-8 bg-white rounded-2xl">
          <div className="mb-2 text-2xl font-semibold">Delivery Details</div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <IconBike stroke={1.5} />
              Courier payment
            </div>
            <div>5 $</div>
          </div>

          <div className="mt-8 mb-2 text-xl font-semibold">Deliver at</div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <IconClock stroke={1.5} />
              Now: 45-60 min
            </div>
            <div></div>
          </div>

          <div className="mt-8 mb-2 text-xl font-semibold">More info</div>

          <div className="mb-2 flex flex-row justify-between">
            <div>Minimum order value</div>
            <div>10 $</div>
          </div>

          <div className="mb-2 flex flex-row justify-between">
            <div>Maximum order weight</div>
            <div>20 kg</div>
          </div>

          <button
            onClick={close}
            className="mt-4 px-5 py-3 w-full text-center text-base font-medium cursor-pointer rounded-2xl bg-zinc-200 hover:bg-zinc-300 hover:scale-95 duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
