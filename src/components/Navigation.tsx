import Link from "next/link";
import {
  IconClock,
  IconLink,
  IconMilk,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { ScrollArea } from "@mantine/core";
import { Channel, Shop } from "@next-orders/api-sdk";
import { LinkButton } from "@/components/LinkButton";

type Props = {
  shop: Shop | null;
  channel: Channel | null;
  toggle: () => void;
};

export const Navigation = ({ shop, channel, toggle }: Props) => {
  const menu = channel?.menus[0];

  const buttons = menu?.categories?.map((item) => (
    <LinkButton
      key={item.id}
      link={"/catalog/" + item.slug}
      label={item.name}
      icon={<IconMilk stroke={1.5} className="w-6" />}
      toggle={toggle}
    />
  ));

  return (
    <div className="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
      <ScrollArea className="h-screen">
        <div className="mb-8">
          <Link href="/" className="text-emerald-600 font-semibold text-xl">
            {shop?.name}
          </Link>
          <div className="mt-1 text-sm leading-tight">{shop?.description}</div>
        </div>

        <div className="mb-8">
          <p className="font-semibold text-lg mb-2">Delivery</p>

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

          <div className="flex flex-row gap-2 items-center">
            <IconLink stroke={1.5} /> details
          </div>
        </div>

        <div className="mb-32">
          <p className="font-semibold text-lg">Catalog</p>
          {buttons}
        </div>
      </ScrollArea>
    </div>
  );
};
