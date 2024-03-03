"use client";

import { IconTextPlus } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { getDictionary, Locale } from "@/dictionaries";
import { CreateBlock } from "@/components/CreateBlock";

type ChannelCreateBlockProps = {
  locale: Locale;
};

export const ChannelCreateBlock = ({ locale }: ChannelCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateChannel);

  const { CREATE_CHANNEL_LABEL } = getDictionary(locale);

  return (
    <CreateBlock locale={locale}>
      <Button onClick={toggle}>
        <IconTextPlus stroke={1.5} /> {CREATE_CHANNEL_LABEL}
      </Button>
    </CreateBlock>
  );
};
