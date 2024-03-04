'use client';

import { IconTextPlus } from '@tabler/icons-react';
import { getDictionary, Locale } from '../../../../dictionaries';
import { CreateBlock } from '../../../../components/CreateBlock';
import { useModalStore } from '../../../../store/modal';
import { Button } from '@next-orders/ui';

type ProductionCreateBlockProps = {
  locale: Locale;
};

export const ProductionCreateBlock = ({
  locale,
}: ProductionCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateProduction);

  const { CREATE_PRODUCTION_LABEL } = getDictionary(locale);

  return (
    <CreateBlock locale={locale}>
      <Button variant="secondary" onClick={toggle}>
        <IconTextPlus stroke={1.5} /> {CREATE_PRODUCTION_LABEL}
      </Button>
    </CreateBlock>
  );
};
