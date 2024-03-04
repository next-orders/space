import { Suspense } from 'react';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import ClientsBlock from './ClientsBlock';
import { ClientsBlockSkeleton } from './ClientsBlockSkeleton';
import { getLocale } from '../../../client/locale';
import { getDictionary } from '../../../dictionaries';

export default async function Page() {
  const locale = getLocale();

  const { CLIENT_BASE_LABEL } = getDictionary(locale);

  return (
    <>
      <Breadcrumbs keys={['CLIENT_BASE']} />

      <h1 className="mb-2 text-3xl font-semibold">{CLIENT_BASE_LABEL}</h1>

      <Suspense fallback={<ClientsBlockSkeleton locale={locale} />}>
        <ClientsBlock />
      </Suspense>
    </>
  );
}
