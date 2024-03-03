import Link from 'next/link';
import { IconBrandGithubFilled, IconHearts } from '@tabler/icons-react';
import { Locale } from '@/dictionaries';
import { LanguageBlock } from '@/components/LanguageBlock';

export const Footer = ({ locale }: { locale: Locale }) => {
  return (
    <div className="px-4 lg:px-12 pb-10 mt-20 text-center">
      <LanguageBlock locale={locale} />
      {!process.env.NEXT_PUBLIC_DISABLE_COPYRIGHT && <CopyrightBlock />}
    </div>
  );
};

const CopyrightBlock = () => {
  return (
    <>
      <div className="flex flex-row gap-1 justify-center">
        Created with <IconHearts stroke={1.5} className="text-red-500" /> by
        Nick Kosarev and team
      </div>

      <div className="mt-4">
        <Link
          href="https://github.com/next-orders/command-center"
          target="_blank"
          aria-label="Open GitHub repository of this project"
          className="px-3 py-3 bg-zinc-800 inline-block rounded-full text-white hover:scale-110 duration-200"
        >
          <IconBrandGithubFilled stroke={1.5} size={24} />
        </Link>
      </div>
    </>
  );
};
