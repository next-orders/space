'use client';

import Image from 'next/image';
import { ProductVariant } from '@next-orders/api-sdk';
import { useModalStore } from '../../../../store/modal';
import NoImage from '../../../../../public/static/no-image-zinc.png';

type ProductVariantBlockProps = {
  product: ProductVariant;
};

export const ProductVariantBlock = ({ product }: ProductVariantBlockProps) => {
  const toggle = useModalStore((state) => state.toggleEditProductVariantMedia);

  const photo = product.media.length ? product.media[0].media : undefined;

  return (
    <div className="mt-10">
      <div className="max-w-sm">
        <div className="relative w-full aspect-square">
          <Image
            src={photo?.url ?? NoImage}
            alt={photo?.alt ?? ''}
            priority
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
            className="rounded-xl object-cover object-center"
            onClick={toggle}
          />
        </div>
      </div>
    </div>
  );
};
