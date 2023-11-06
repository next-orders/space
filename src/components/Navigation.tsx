import Link from "next/link";
import { IconClock, IconLink, IconTruckDelivery } from "@tabler/icons-react";
import type { Channel, Shop } from "@next-orders/api-sdk";
import { LinkButton } from "@/components/LinkButton";

type Props = {
  shop: Shop | null;
  channel: Channel | null;
  toggle: () => void;
  deliveryInfoModalToggle: () => void;
};

export const Navigation = ({
  shop,
  channel,
  toggle,
  deliveryInfoModalToggle,
}: Props) => {
  const menu = channel?.menus[0];

  const buttons = menu?.categories?.map((item) => {
    return (
      <LinkButton
        key={item.id}
        link={"/catalog/" + item.slug}
        label={item.name}
        iconUrl={item.iconUrl}
        toggle={toggle}
      />
    );
  });

  return (
    <div className="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
      <div className="h-screen overflow-y-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="font-medium text-xl"
            style={{ color: channel?.accentTextColor }}
          >
            {shop?.name}
          </Link>
          <div className="mt-1 text-sm leading-tight">{shop?.description}</div>
        </div>

        <div className="mb-8">
          <p className="font-medium text-lg mb-2">Delivery</p>

          <div className="flex flex-row gap-2 items-center mb-2">
            <IconClock stroke={1.5} /> today until 22:00
          </div>

          <div className="flex flex-row gap-2 items-center mb-2">
            <IconTruckDelivery stroke={1.5} />
            <div>
              free from 25
              <span className="text-sm">$</span>
            </div>
          </div>

          <button
            onClick={deliveryInfoModalToggle}
            className="flex flex-row gap-2 items-center hover:scale-95 duration-200"
          >
            <IconLink stroke={1.5} /> show details
          </button>
        </div>

        <div className="mb-32">
          <p className="font-medium text-lg">Catalog</p>
          {buttons}
        </div>
      </div>
    </div>
  );
};
