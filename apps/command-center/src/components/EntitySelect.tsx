'use client';

import React from 'react';
import { IconChefHat } from '@tabler/icons-react';
import { getDictionary, Locale } from '../dictionaries';

type BusinessEntity = {
  id: string;
  name: string;
};

type EntitySelectProps = {
  locale: Locale;
  type: 'PRODUCT';
  onClick: () => void;
  entity: BusinessEntity | null | undefined;
};

export const EntitySelect = ({
  locale,
  type,
  onClick,
  entity,
}: EntitySelectProps) => {
  const { CHOOSE_A_PRODUCT_LABEL } = getDictionary(locale);

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="w-full px-3 py-3 flex flex-row gap-2 justify-center font-normal bg-zinc-100 rounded-2xl cursor-pointer outline-2 outline-offset-1 outline-zinc-500 focus:ring-zinc-500 focus:border-zinc-500 hover:bg-zinc-200 hover:scale-95 active:scale-90 duration-200 disabled:animate-pulse"
      >
        <div className="w-full flex flex-row gap-4 justify-start items-center">
          <div className="px-4 py-4 bg-white rounded-2xl">
            <IconChefHat stroke={1.5} className="w-8 h-8 text-zinc-400" />
          </div>

          {entity ? (
            <div>{entity?.name}</div>
          ) : (
            <div>{CHOOSE_A_PRODUCT_LABEL}</div>
          )}
        </div>
      </button>
    </div>
  );
};
