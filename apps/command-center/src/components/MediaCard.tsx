'use client';

import Image from 'next/image';
import { IconEyeOff, IconFileArrowRight } from '@tabler/icons-react';
import { Media } from '@next-orders/api-sdk';
import { MenuAction } from '@/types';
import { getDictionary, Locale } from '@/dictionaries';

type MediaCardProps = {
  media: Media;
};

export const MediaCard = ({ media }: MediaCardProps) => {
  const actionsInMenu: MenuAction[] = [
    {
      id: '1',
      label: 'Open',
      url: `/product/123`,
      icon: <IconFileArrowRight stroke={1.5} className="text-zinc-500" />,
    },
    {
      id: '2',
      label: 'Enable / Disable',
      icon: <IconEyeOff stroke={1.5} className="text-zinc-500" />,
    },
  ];

  return (
    <div
      onClick={() => navigator.clipboard.writeText(media.id)}
      className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 active:scale-90 duration-200 group"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={media.url}
          alt={media.alt ?? ''}
          priority
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
          className="rounded-xl object-cover object-center"
        />
      </div>

      <div className="mt-2 text-base font-medium leading-tight text-center">
        {media.alt}
      </div>
    </div>
  );
};

export const MediaCardSkeleton = ({ locale }: { locale: Locale }) => {
  const { LOADING_LABEL } = getDictionary(locale);

  return (
    <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-zinc-200" />
      <div className="mt-2 text-base font-medium leading-tight text-center text-zinc-400">
        {LOADING_LABEL}
      </div>
    </div>
  );
};
