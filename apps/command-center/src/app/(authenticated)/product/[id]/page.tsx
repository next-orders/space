import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { TextInput } from '../../../../components/TextInput';
import { ProductVariant } from '@next-orders/api-sdk';
import { GetProductById } from '../../../../client/api';
import NoImage from '../../../../../public/static/no-image-zinc.png';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const product = await GetProductById(params.id);
  if (!product) {
    notFound();
  }

  const variants = product.variants?.map((variant) => (
    <ProductVariantBlock key={variant.id} variant={variant} />
  ));

  return (
    <>
      <Breadcrumbs keys={['PRODUCTS', 'PRODUCT_PAGE']} />

      <h1 className="mb-2 text-3xl font-semibold">Product page</h1>
      <div className="mb-8">Here you can edit product data</div>

      <div className="px-4 py-4 max-w-[40rem] bg-zinc-100 rounded-2xl">
        <TextInput
          label="Product name"
          value={product.name}
          placeholder="Required"
        />

        <TextInput
          label="Description"
          value={product.description || ''}
          placeholder=""
        />
      </div>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">Product Variants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants}
      </div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(product, undefined, 2)}
      </pre>
    </>
  );
}

type ProductVariantBlockProps = {
  variant: ProductVariant;
};

const ProductVariantBlock = ({ variant }: ProductVariantBlockProps) => {
  const media = variant?.media?.length ? variant.media[0].media : undefined;

  return (
    <div className="px-2 py-2 bg-zinc-50 rounded-2xl">
      <div className="mb-2 flex flex-row justify-between gap-2">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={media?.url || NoImage}
            alt={media?.alt || 'Photo'}
            width={60}
            height={60}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
            unoptimized
            className="rounded-xl"
          />
          <div>
            <div className="text-lg line-clamp-2">{variant.name}</div>
            <div className="text-sm text-zinc-500">{variant.gross}$</div>
          </div>
        </div>
      </div>
    </div>
  );
};
