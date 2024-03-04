'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '../store/ui';

type LinkButtonProps = {
  link: string;
  label: string;
  icon: React.ReactNode;
};

export const LinkButton = ({ link, label, icon }: LinkButtonProps) => {
  const activePath = usePathname();

  const toggleNavbar = useUIStore((state) => state.toggleNavbar);

  return (
    <Link
      href={link}
      onClick={toggleNavbar}
      className="text-base font-normal flex flex-row items-center gap-3 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-medium hover:bg-zinc-100 hover:scale-95 duration-200"
      data-active={activePath === link}
    >
      {icon}
      {label}
    </Link>
  );
};
