"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuCategory } from "@next-orders/api-sdk";
import { getIconUrl } from "@/lib/helpers";

type CategoryButtonProps = {
  category: MenuCategory;
};

export const CategoryButton = ({ category }: CategoryButtonProps) => {
  const iconUrl = getIconUrl(category.icon);

  return (
    <Link
      href={`/menu-category/${category.id}`}
      className="px-5 py-3 max-w-fit flex flex-row gap-2 bg-zinc-100 rounded-2xl cursor-pointer hover:bg-zinc-200 hover:scale-95 active:scale-90 duration-200"
    >
      <Image src={iconUrl} alt="" width={32} height={32} className="w-8 h-8" />

      <h2 className="text-2xl font-medium">{category.name}</h2>
    </Link>
  );
};
