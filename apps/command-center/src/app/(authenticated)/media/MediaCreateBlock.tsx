'use client';

import { IconPhotoPlus } from '@tabler/icons-react';
import { getDictionary, Locale } from '../../../dictionaries';
import { useModalStore } from '../../../store/modal';
import { CreateBlock } from '../../../components/CreateBlock';
import { Button } from '@next-orders/ui';

type MediaCreateBlockProps = {
  locale: Locale;
};

export const MediaCreateBlock = ({ locale }: MediaCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMedia);

  const { CREATE_MEDIA_LABEL } = getDictionary(locale);

  return (
    <CreateBlock locale={locale}>
      <Button variant="secondary" onClick={toggle}>
        <IconPhotoPlus stroke={1.5} /> {CREATE_MEDIA_LABEL}
      </Button>
    </CreateBlock>
  );
};
