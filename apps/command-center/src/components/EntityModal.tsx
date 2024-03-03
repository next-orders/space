import React from 'react';
import { IconX } from '@tabler/icons-react';

type EntityModalProps = {
  title: string;
  isOpened: boolean;
  toggle: () => void;
  children: React.ReactNode;
};

export const EntityModal = ({
  title,
  isOpened,
  toggle,
  children,
}: EntityModalProps) => {
  return (
    <>
      <div
        className="z-40 fixed left-0 right-0 -top-20 -bottom-20 bg-zinc-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
        onClick={toggle}
        data-active={isOpened}
      />
      <div
        className="z-40 fixed left-0 top-0 w-full max-w-5xl max-h-[100dvh] overflow-y-auto p-2 m-0 pb-20 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
        data-active={isOpened}
      >
        <div className="mt-16 p-4 md:p-6 lg:p-8 bg-white rounded-2xl shadow-lg">
          <div className="mb-4 flex flex-row justify-between items-center">
            <h3 className="text-xl md:text-2xl font-medium">{title}</h3>

            <button
              onClick={toggle}
              aria-label="Close"
              className="block rounded-xl hover:scale-90 hover:bg-zinc-100 duration-200"
            >
              <IconX stroke={1.5} className="w-8 h-8" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};
