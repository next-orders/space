import { GetProducts } from '../../../../client/api';
import { ProductProductionCard } from '../../../../components/ProductProductionCard';
import { ProductionCreateBlock } from './ProductionCreateBlock';
import { getLocale } from '../../../../client/locale';

export default async function ProductionBlock() {
  const products = await GetProducts();
  const locale = getLocale();

  const showProducts = products
    ?.filter((product) => product.type === 'PRODUCTION')
    ?.map((product) => (
      <ProductProductionCard key={product.id} product={product} />
    ));

  const haveNoEntities = !showProducts?.length;
  if (haveNoEntities) {
    return <ProductionCreateBlock locale={locale} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      <div className="col-span-1 md:col-span-2 self-center">
        <ProductionCreateBlock locale={locale} />
      </div>
      {showProducts}
    </div>
  );
}
