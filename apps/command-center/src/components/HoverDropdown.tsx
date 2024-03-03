'use client';

import React from 'react';
import { Markdown } from '@/components/Markdown';

type HoverDropdownProps = {
  dropdown: string;
  children: React.ReactNode;
};

export const HoverDropdown = ({ dropdown, children }: HoverDropdownProps) => {
  return (
    <div className="relative block group/drop overflow-visible">
      <div>{children}</div>
      <div className="z-10 fixed left-4 top-20 lg:absolute lg:top-auto lg:left-0 lg:right-0 mt-4 origin-bottom-left invisible group-hover/drop:visible group-focus/drop:visible group-active/drop:visible group-focus-within/drop:visible group-focus-visible/drop:visible">
        <div className="mx-auto w-72 bg-white px-4 py-4 rounded-2xl shadow-md duration-200 font-normal leading-normal">
          <Markdown>{dropdown}</Markdown>
        </div>
      </div>
    </div>
  );
};
