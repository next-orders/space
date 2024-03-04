import { MediaCard } from '../../../components/MediaCard';
import { ErrorBlock } from '../../../components/ErrorBlock';
import { MediaCreateBlock } from './MediaCreateBlock';
import { getLocale } from '../../../client/locale';
import { GetAllMedia } from '../../../client/access';

export default async function MediaBlock() {
  const media = await GetAllMedia();

  if (media instanceof Error) {
    return <ErrorBlock error={media} />;
  }

  const locale = getLocale();

  const haveNoEntities = !media?.length;
  if (haveNoEntities) {
    return <MediaCreateBlock locale={locale} />;
  }

  const showMedia = media?.map((media) => (
    <MediaCard key={media.id} media={media} />
  ));

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
      <div className="col-span-2 self-center">
        <MediaCreateBlock locale={locale} />
      </div>
      {showMedia}
    </div>
  );
}
