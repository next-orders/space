import React from 'react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MenuItem } from '@/types';
import { Locale } from '@/dictionaries';

type Props = {
  menu: MenuItem[];
  locale: Locale;
  children: React.ReactNode;
};

export const Shell = ({ menu, locale, children }: Props) => {
  return (
    <>
      <header className="z-20 h-16 bg-white fixed top-0 left-0 right-0">
        <Header locale={locale} />
      </header>

      <Navigation menu={menu} locale={locale} />

      <main className="relative w-auto bg-white top-16 2xl:pl-72">
        <div className="px-4 pb-10 pt-4">{children}</div>
        <Footer locale={locale} />
      </main>
    </>
  );
};
