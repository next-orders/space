import React from 'react';
import Image from 'next/image';
import { getDictionary, Locale } from '@/dictionaries';
import StaticGreenNotebook from '@/../public/static/green-notebook.png';

type CreateBlockProps = {
  locale: Locale;
  children: React.ReactNode;
};

export const CreateBlock = ({ locale, children }: CreateBlockProps) => {
  const { MAYBE_ITS_TIME_LABEL } = getDictionary(locale);

  return (
    <div className="text-center max-w-xl mx-auto p-4">
      <Image
        src={StaticGreenNotebook}
        width={StaticGreenNotebook.width}
        height={StaticGreenNotebook.height}
        alt=""
        className="mx-auto mb-4 w-16 h-16"
      />
      <h2 className="text-lg font-medium">{MAYBE_ITS_TIME_LABEL}</h2>

      <div className="mt-4 mx-auto w-fit">{children}</div>
    </div>
  );
};
