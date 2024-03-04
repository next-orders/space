import { MediaCardSkeleton } from '../../../components/MediaCard';
import { Locale } from '../../../dictionaries';

export const MediaBlockSkeleton = ({ locale }: { locale: Locale }) => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
      <MediaCardSkeleton locale={locale} />
      <MediaCardSkeleton locale={locale} />
      <MediaCardSkeleton locale={locale} />
      <MediaCardSkeleton locale={locale} />
      <MediaCardSkeleton locale={locale} />
      <MediaCardSkeleton locale={locale} />
      <MediaCardSkeleton locale={locale} />
    </div>
  );
};
