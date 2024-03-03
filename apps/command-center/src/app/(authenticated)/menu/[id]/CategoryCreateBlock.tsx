"use client";

import { IconCopyPlus, IconTextPlus } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { getDictionary, Locale } from "@/dictionaries";
import { CreateBlock } from "@/components/CreateBlock";
import { CategoryCreateModal } from "@/app/(authenticated)/menu/[id]/CategoryCreateModal";

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
        <Button onClick={toggleCreateMenuCategory}>
          <IconTextPlus stroke={1.5} /> {CREATE_MENU_CATEGORY_LABEL}
        </Button>
        <div className="mt-2">
          <Button onClick={toggleCreateProductVariant}>
            <IconCopyPlus stroke={1.5} /> {CREATE_PRODUCT_VARIANT_LABEL}
          </Button>
        </div>
      </CreateBlock>

      <CategoryCreateModal locale={locale} menuId={menuId} />
    </>
  );
};
