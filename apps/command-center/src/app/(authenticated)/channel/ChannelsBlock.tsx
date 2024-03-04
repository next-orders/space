import Link from 'next/link';
import { GetChannels } from '../../../client/api';
import { ChannelCreateBlock } from './ChannelCreateBlock';
import { Channel } from '@next-orders/api-sdk';
import { IconBuildingStore } from '@tabler/icons-react';
import { getDictionary, Locale } from '../../../dictionaries';
import { getLocale } from '../../../client/locale';

export default async function ChannelsBlock() {
  const channels = await GetChannels();
  const locale = getLocale();

  const haveNoEntities = !channels?.length;
  if (haveNoEntities) {
    return <ChannelCreateBlock locale={locale} />;
  }

  const showChannels = channels?.map((channel) => (
    <ChannelCard key={channel.id} channel={channel} locale={locale} />
  ));

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2 items-center">
      {showChannels}
      <div className="col-span-1">
        <ChannelCreateBlock locale={locale} />
      </div>
    </div>
  );
}

type ChannelCardProps = {
  locale: Locale;
  channel: Channel;
};

const ChannelCard = ({ locale, channel }: ChannelCardProps) => {
  const { OPEN_BUTTON } = getDictionary(locale);

  return (
    <Link href={`/channel/${channel.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto px-4 py-4 cursor-pointer hover:scale-95 active:scale-90 duration-200 group">
        <IconBuildingStore
          stroke={1.5}
          className="mx-auto mt-4 mb-2 w-14 h-14 text-teal-500"
        />

        <div className="mb-2 text-2xl font-semibold leading-tight text-center">
          {channel.name}
        </div>
        <div className="text-base font-normal leading-tight text-center">
          {channel.description}
        </div>

        <div className="mt-6 flex flex-row gap-2 justify-center">
          <div className="p-4 bg-white rounded-full">
            {channel.currencyCode}
          </div>
          <div className="p-4 bg-white rounded-full">
            {channel.languageCode}
          </div>
        </div>

        <div className="mt-4 px-6 py-4 font-medium text-center bg-zinc-100 rounded-xl group-hover:bg-teal-200 duration-200">
          {OPEN_BUTTON}
        </div>
      </div>
    </Link>
  );
};
