'use client';

import { IconTextPlus } from '@tabler/icons-react';
import { useModalStore } from '../../../store/modal';
import { getDictionary, Locale } from '../../../dictionaries';
import { CreateBlock } from '../../../components/CreateBlock';
import { Button } from '@next-orders/ui';

type ChannelCreateBlockProps = {
  locale: Locale;
};

export const ChannelCreateBlock = ({ locale }: ChannelCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateChannel);

  const { CREATE_CHANNEL_LABEL } = getDictionary(locale);

  return (
    <CreateBlock locale={locale}>
      <Button variant="secondary" onClick={toggle}>
        <IconTextPlus stroke={1.5} /> {CREATE_CHANNEL_LABEL}
      </Button>
    </CreateBlock>
  );
};
