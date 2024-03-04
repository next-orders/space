import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import ProductionBlock from './ProductionBlock';
import { ProductionCreateModal } from './ProductionCreateModal';
import { getLocale } from '../../../../client/locale';

export default async function Page() {
  const locale = getLocale();

  return (
    <>
      <Breadcrumbs keys={['PRODUCTS', 'PRODUCTION_PAGE']} />

      <h1 className="mb-2 text-3xl font-semibold">Production</h1>
      <div className="mb-8">All loaded items</div>

      <ProductionBlock />

      <ProductionCreateModal locale={locale} />
    </>
  );
}
