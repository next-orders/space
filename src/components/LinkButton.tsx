"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type LinkButtonProps = {
  link: string;
  label: string;
  iconUrl: string | null;
  toggle: () => void;
};

export const LinkButton = ({
  link,
  label,
  iconUrl,
  toggle,
}: LinkButtonProps) => {
  const activePath = usePathname();

  return (
    <Link
      href={link}
      onClick={toggle}
      className="text-base font-medium flex flex-row items-center gap-4 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-semibold hover:bg-zinc-100 hover:scale-95 duration-200 group"
      data-active={activePath === link}
    >
      <Image
        src={iconUrl ?? "/static/default-icon.png"}
        alt=""
        width={48}
        height={48}
        className="w-8 h-8 group-hover:scale-125 duration-200"
      />
      {label}
    </Link>
  );
};
