"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UnstyledButton } from "@mantine/core";

type LinkButtonProps = {
  link: string;
  label: string;
  icon: React.ReactNode;
  toggle: () => void;
};

export const LinkButton = ({ link, label, icon, toggle }: LinkButtonProps) => {
  const activePath = usePathname();
  const linkActive = activePath === link;

  return (
    <UnstyledButton component={Link} href={link} onClick={toggle}>
      <div
        className="text-base font-medium flex flex-row items-center gap-3 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-semibold hover:bg-zinc-100 hover:scale-95 duration-200"
        data-active={linkActive}
      >
        {icon}
        {label}
      </div>
    </UnstyledButton>
  );
};
