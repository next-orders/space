"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconClock,
  IconLink,
  IconMilk,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { ScrollArea, UnstyledButton } from "@mantine/core";
import { Category } from "@next-orders/api-sdk";

type Props = {
  categories: Category[] | null;
  toggle: () => void;
};

export const Navigation = ({ categories, toggle }: Props) => {
  const Categories = () => {
    return categories?.map((item) => (
      <LinkButton
        key={item.id}
        link={"/catalog/" + item.slug}
        label={item.name}
        icon={<IconMilk stroke={1.5} className="w-6" />}
        toggle={toggle}
      />
    ));
  };

  return (
    <div className="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
      <ScrollArea className="h-screen">
        <div className="mb-8">
          <Link href="/" className="text-emerald-600 font-semibold text-xl">
            Nourishing and tasty
          </Link>
          <div className="mt-1 text-sm leading-tight">
            Order hot pizza and special sushi
          </div>
        </div>

        <div className="mb-8">
          <p className="font-semibold text-lg mb-2">Delivery</p>

          <div className="flex flex-row gap-2 items-center mb-2">
            <IconClock stroke={1.5} /> today until 22:00
          </div>

          <div className="flex flex-row gap-2 items-center mb-2">
            <IconTruckDelivery stroke={1.5} /> free from 25 $
          </div>

          <div className="flex flex-row gap-2 items-center">
            <IconLink stroke={1.5} /> details
          </div>
        </div>

        <div className="mb-32">
          <p className="font-semibold text-lg">Catalog</p>
          <Categories />
        </div>
      </ScrollArea>
    </div>
  );
};

const LinkButton = ({
  link,
  label,
  icon,
  toggle,
}: {
  link: string;
  label: string;
  icon: React.ReactNode;
  toggle: () => void;
}) => {
  const activePath = usePathname();
  const linkActive = activePath === link;

  return (
    <UnstyledButton component={Link} href={link} onClick={toggle}>
      <div
        className="text-base font-medium flex flex-row items-center gap-3 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-semibold hover:bg-zinc-100"
        data-active={linkActive}
      >
        {icon}
        {label}
      </div>
    </UnstyledButton>
  );
};
