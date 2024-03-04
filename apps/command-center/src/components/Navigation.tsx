'use client';

import React from 'react';
import { MenuItem } from '../types';
import { TablerIcon } from './TablerIcon';
import { useUIStore } from '../store/ui';
import { LinkButton } from './LinkButton';
import { getDictionary, Locale } from '../dictionaries';

type NavigationProps = {
  menu: MenuItem[];
  locale: Locale;
};

export const Navigation = ({ menu, locale }: NavigationProps) => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);

  const { COMMAND_CENTER_LABEL } = getDictionary(locale);

  const menuBlock = menu?.map((item) => (
    <LinkButton
      key={item.id}
      link={item.href}
      label={item.label}
      icon={<TablerIcon icon={item.icon} />}
    />
  ));

  return (
    <nav
      data-active={isNavbarOpened}
      className="z-10 w-0 invisible 2xl:visible 2xl:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:visible md:data-[active=true]:w-72"
    >
      <div className="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
        <div className="h-screen overflow-y-auto">
          <div className="mb-32">
            <div className="flex flex-row items-center py-2">
              <div className="font-semibold text-xl">
                {COMMAND_CENTER_LABEL}
              </div>
            </div>

            {menuBlock}
          </div>
        </div>
      </div>
    </nav>
  );
};
