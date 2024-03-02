'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/ui';
import { getIconUrl } from '@/client/helpers';
import { MenuCategoryIcon } from '@next-orders/api-sdk';

type LinkButtonProps = {
  link: string;
  label: string;
  icon: MenuCategoryIcon | null;
};

export const LinkButton = ({ link, label, icon }: LinkButtonProps) => {
  const activePath = usePathname();

  const toggleNavbar = useUIStore((state) => state.toggleNavbar);

  const iconUrl = getIconUrl(icon);

  return (
    <Link
      href={link}
      onClick={toggleNavbar}
      className="text-base font-normal flex flex-row items-center gap-4 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-medium active:scale-95 lg:hover:bg-zinc-100 lg:hover:scale-95 lg:active:scale-90 duration-200 group"
      data-active={activePath === link}
    >
      <Image
        src={iconUrl}
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 group-hover:scale-125 duration-200"
      />
      {label}
    </Link>
  );
};
