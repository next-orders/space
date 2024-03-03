import Link from 'next/link';
import {
  IconCheese,
  IconChefHat,
  IconDiamond,
  IconEye,
  IconTag,
} from '@tabler/icons-react';
import { Product, ProductVariant } from '@next-orders/api-sdk';

export const ProductProductionCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="px-4 py-4 block bg-zinc-50 rounded-2xl cursor-pointer hover:scale-95 active:scale-90 duration-200 group"
    >
      <div className="mb-2 px-4 py-4 bg-white rounded-2xl group-hover:scale-105 duration-200">
        <IconChefHat
          stroke={1.5}
          className="mx-auto mb-2 w-12 h-12 text-zinc-400 group-hover:text-violet-500 duration-500"
        />
      </div>

      <div className="mb-2 text-center text-base lg:text-lg font-medium line-clamp-2">
        {product.name}
      </div>

      <IngredientsBlock />

      <div className="flex flex-row flex-wrap gap-2 justify-center">
        <OnOffBlock isAvailable={product.isAvailableForPurchase} />
        <ScoreBlock score={product.score} />
        <VariantsBlock variants={product.variants} />
      </div>
    </Link>
  );
};

const IngredientsBlock = () => {
  return (
    <ul className="mb-4 px-3 py-3 w-full bg-white rounded-xl text-base list-none leading-relaxed text-zinc-500">
      <li>
        <IconCheese
          stroke={1.5}
          className="mr-2 w-4 h-4 inline-block align-text-top text-zinc-500 group-hover:text-green-500 duration-500"
        />
        First ingredient
      </li>
      <li>
        <IconCheese
          stroke={1.5}
          className="mr-2 w-4 h-4 inline-block align-text-top text-zinc-500 group-hover:text-green-500 duration-500"
        />
        Second ingredient
      </li>
      <li>
        <IconCheese
          stroke={1.5}
          className="mr-2 w-4 h-4 inline-block align-text-top text-zinc-500 group-hover:text-green-500 duration-500"
        />
        Third ingredient
      </li>
    </ul>
  );
};

const OnOffBlock = ({ isAvailable }: { isAvailable: boolean }) => {
  const color = isAvailable ? 'text-teal-500' : 'text-amber-500';
  const text = isAvailable ? 'ON' : 'OFF';

  return (
    <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
      <IconEye stroke={1.5} className={`w-5 h-5 ${color}`} />
      <div>{text}</div>
    </div>
  );
};

const ScoreBlock = ({ score }: { score: number }) => {
  const color = score > 70 ? 'text-teal-500' : 'text-amber-500';

  return (
    <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
      <IconDiamond stroke={1.5} className={`w-5 h-5 ${color}`} />
      <div>{score}</div>
    </div>
  );
};

const VariantsBlock = ({
  variants,
}: {
  variants: ProductVariant[] | undefined;
}) => {
  const count = variants?.length;

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
        <IconTag stroke={1.5} className="w-5 h-5 text-zinc-400" />
        <div>{count}</div>
      </div>
    </div>
  );
};
