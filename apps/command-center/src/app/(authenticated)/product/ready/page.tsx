import { ProductProductionCard } from '../../../../components/ProductProductionCard';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { GetProducts } from '../../../../client/api';

export default async function Page() {
  const products = await GetProducts();

  const cards = products
    ?.filter((product) => product.type === 'READY')
    ?.map((product) => (
      <ProductProductionCard key={product.id} product={product} />
    ));

  return (
    <>
      <Breadcrumbs keys={['PRODUCTS', 'READY_PAGE']} />

      <h1 className="mb-2 text-3xl font-semibold">Ready Products</h1>
      <div className="mb-8">All loaded items</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards}
      </div>
    </>
  );
}
