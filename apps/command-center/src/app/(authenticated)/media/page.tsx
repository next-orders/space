import { Suspense } from 'react';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import MediaBlock from './MediaBlock';
import { MediaBlockSkeleton } from './MediaBlockSkeleton';
import { MediaCreateModal } from './MediaCreateModal';
import { getLocale } from '../../../client/locale';
import { getDictionary } from '../../../dictionaries';

export default async function Page() {
  const locale = getLocale();
  const { MEDIA_LABEL } = getDictionary(locale);

  return (
    <>
      <Breadcrumbs keys={['MEDIA']} />

      <h1 className="mb-2 text-3xl font-semibold">{MEDIA_LABEL}</h1>

      <Suspense fallback={<MediaBlockSkeleton locale={locale} />}>
        <MediaBlock />
      </Suspense>

      <MediaCreateModal locale={locale} />
    </>
  );
}
