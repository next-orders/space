"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui";

type LinkButtonProps = {
  link: string;
  label: string;
  iconUrl: string | null;
};

export const LinkButton = ({ link, label, iconUrl }: LinkButtonProps) => {
  const activePath = usePathname();

  const toggleNavbar = useUIStore((state) => state.toggleNavbar);

  return (
    <Link
      href={link}
      onClick={toggleNavbar}
      className="text-base font-normal flex flex-row items-center gap-4 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-medium hover:bg-zinc-100 hover:scale-95 active:scale-90 duration-200 group"
      data-active={activePath === link}
    >
      <Image
        src={iconUrl ?? "/static/default-icon.png"}
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 group-hover:scale-125 duration-200"
      />
      {label}
    </Link>
  );
};
