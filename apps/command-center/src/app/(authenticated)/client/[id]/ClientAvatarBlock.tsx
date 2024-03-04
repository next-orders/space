import Image from 'next/image';
import { HoverDropdown } from '../../../../components/HoverDropdown';
import { LevelBadge } from '../../../../components/LevelBadge';
import { notFound } from 'next/navigation';
import { getColorByClientLevel } from '../../../../lib/helpers';
import { TraitsBlock } from '../../../../components/TraitsBlock';
import { LoyaltyProgress } from '../../../../components/LoyaltyProgress';
import { GetAvatarURL } from '../../../../client/api';
import { ErrorBlock } from '../../../../components/ErrorBlock';
import { getDictionary, Locale } from '../../../../dictionaries';
import { GetClientById } from '../../../../client/access';

type ClientAvatarBlockProps = {
  id: string;
  locale: Locale;
};

export default async function ClientAvatarBlock({
  id,
  locale,
}: ClientAvatarBlockProps) {
  const client = await GetClientById(id);

  if (client instanceof Error) {
    return <ErrorBlock error={client} />;
  }

  if (!client) {
    notFound();
  }

  const avatarClothingColor = getColorByClientLevel(client.level);
  const clientAvatarURL = GetAvatarURL(client.avatarId, 140, {
    gender: client.gender,
    emotion: client.emotion,
    clothing: avatarClothingColor,
  });
  const clientLoyaltyPercent = client.loyalty;

  const { IT_IS_LABEL, CLIENT_LOYALTY_TOOLTIP, CLIENT_LEVEL_TOOLTIP } =
    getDictionary(locale);

  return (
    <div className="mb-4 mx-auto max-w-xs group">
      <div className="relative w-full bg-zinc-50 rounded-2xl h-auto px-3 py-3">
        <Image
          src={clientAvatarURL}
          alt="Client"
          unoptimized
          width={300}
          height={300}
          className="w-full aspect-square rounded-xl"
        />
        <div className="absolute top-6 left-0 right-0">
          <HoverDropdown dropdown={CLIENT_LOYALTY_TOOLTIP}>
            <LoyaltyProgress percent={clientLoyaltyPercent} />
          </HoverDropdown>
        </div>
        <div className="absolute top-1 right-1 md:group-hover:scale-105 duration-300">
          <HoverDropdown dropdown={CLIENT_LEVEL_TOOLTIP}>
            <div className="md:hover:scale-125 duration-200">
              <LevelBadge level={client.level} size="lg" />
            </div>
          </HoverDropdown>
        </div>

        <div className="mt-3 text-lg font-medium leading-tight text-center">
          {IT_IS_LABEL} {client.firstName} {client.lastName}
        </div>
      </div>

      <div className="mt-4">
        <TraitsBlock traits={client.traits} locale={locale} />
      </div>
    </div>
  );
}
