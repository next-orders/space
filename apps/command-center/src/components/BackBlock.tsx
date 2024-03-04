'use client';

import { useRouter } from 'next/navigation';
import { IconArrowBackUp } from '@tabler/icons-react';
import { getDictionary, Locale } from '../dictionaries';
import { Button } from '@next-orders/ui';

type BackBlockProps = {
  locale: Locale;
};

export const BackBlock = ({ locale }: BackBlockProps) => {
  const router = useRouter();
  const { RETURN_BUTTON } = getDictionary(locale);

  const handleClick = () => router.back();

  return (
    <div className="w-full md:w-auto mx-auto md:mx-0">
      <Button variant="secondary" size="lg" onClick={handleClick}>
        <IconArrowBackUp stroke={1.5} /> {RETURN_BUTTON}
      </Button>
    </div>
  );
};
