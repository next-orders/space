import React from 'react';
import { IconRotateClockwise2 } from '@tabler/icons-react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  isLoading?: boolean;
};

export const Button = ({
  children,
  onClick,
  type = 'button',
  isLoading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      aria-disabled={isLoading}
      className="w-full px-4 py-3 flex flex-row gap-2 justify-center font-normal bg-zinc-100 rounded-2xl cursor-pointer outline-2 outline-offset-1 outline-zinc-500 focus:ring-zinc-500 focus:border-zinc-500 hover:bg-zinc-200 hover:scale-95 active:scale-90 duration-200 disabled:animate-pulse"
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};

const Loading = () => {
  return (
    <IconRotateClockwise2 className="w-6 h-6 text-zinc-500 animate-spin" />
  );
};
