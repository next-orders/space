import Image from 'next/image';
import Link from 'next/link';
import { LevelBadge } from './LevelBadge';
import { Client } from '@next-orders/api-sdk';
import { getColorByClientLevel } from '../lib/helpers';
import { GetAvatarURL } from '../client/api';
import { getDictionary, Locale } from '../dictionaries';

type ClientCardProps = {
  client: Client;
};

export const ClientCard = ({ client }: ClientCardProps) => {
  const avatarClothingColor = getColorByClientLevel(client.level);
  const clientAvatarURL = GetAvatarURL(client.avatarId, 140, {
    gender: client.gender,
    emotion: client.emotion,
    clothing: avatarClothingColor,
  });

  return (
    <Link href={`/client/${client.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 duration-200 group">
        <div className="relative">
          <Image
            src={clientAvatarURL}
            alt="Client"
            unoptimized
            width={300}
            height={300}
            className="w-full aspect-square rounded-xl"
          />
          <div className="absolute top-1 right-1 group-hover:scale-110 duration-200">
            <LevelBadge level={client.level} size="md" />
          </div>
        </div>

        <div className="mt-2 text-base font-medium leading-tight text-center">
          {client.firstName}
        </div>
      </div>
    </Link>
  );
};

export const ClientCardSkeleton = ({ locale }: { locale: Locale }) => {
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
