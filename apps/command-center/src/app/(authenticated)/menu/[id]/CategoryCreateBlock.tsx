'use client';

import { IconCopyPlus, IconTextPlus } from '@tabler/icons-react';
import { useModalStore } from '../../../../store/modal';
import { getDictionary, Locale } from '../../../../dictionaries';
import { CreateBlock } from '../../../../components/CreateBlock';
import { CategoryCreateModal } from './CategoryCreateModal';
import { Button } from '@next-orders/ui';

type CategoryCreateBlockProps = {
  menuId: string;
  locale: Locale;
};

export const CategoryCreateBlock = ({
  locale,
  menuId,
}: CategoryCreateBlockProps) => {
  const toggleCreateMenuCategory = useModalStore(
    (state) => state.toggleCreateMenuCategory,
  );
  const toggleCreateProductVariant = useModalStore(
    (state) => state.toggleCreateProductVariant,
  );

  const { CREATE_MENU_CATEGORY_LABEL, CREATE_PRODUCT_VARIANT_LABEL } =
    getDictionary(locale);

  return (
    <>
      <CreateBlock locale={locale}>
        <Button
          variant="secondary"
          onClick={toggleCreateMenuCategory}
          className="mx-auto"
        >
          <IconTextPlus stroke={1.5} /> {CREATE_MENU_CATEGORY_LABEL}
        </Button>

        <Button
          variant="secondary"
          onClick={toggleCreateProductVariant}
          className="mt-2 mx-auto"
        >
          <IconCopyPlus stroke={1.5} /> {CREATE_PRODUCT_VARIANT_LABEL}
        </Button>
      </CreateBlock>

      <CategoryCreateModal locale={locale} menuId={menuId} />
    </>
  );
};
