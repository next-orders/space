"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UnstyledButton } from "@mantine/core";
import Image from "next/image";

type LinkButtonProps = {
  link: string;
  label: string;
  iconUrl: string | null | undefined;
  icon: React.ReactNode;
  toggle: () => void;
};

export const LinkButton = ({
  link,
  label,
  icon,
  iconUrl,
  toggle,
}: LinkButtonProps) => {
  const activePath = usePathname();

  const showIcon = iconUrl ? (
    <Image src={iconUrl} alt="" width={48} height={48} className="w-6 h-6" />
  ) : (
    icon
  );

  return (
    <UnstyledButton component={Link} href={link} onClick={toggle}>
      <div
        className="text-base font-medium flex flex-row items-center gap-3 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-semibold hover:bg-zinc-100 hover:scale-95 duration-200"
        data-active={activePath === link}
      >
        {showIcon}
        {label}
      </div>
    </UnstyledButton>
  );
};
