"use client";

import React from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

type CounterProps = {
  count: number;
};

export const Counter = ({ count }: CounterProps) => {
  const [countNow, setCountNow] = React.useState<number>(count);

  const handleMinus = () => {
    setCountNow((prevState) => (prevState > 0 ? prevState - 1 : 0));
  };

  const handlePlus = () => {
    setCountNow((prevState) => prevState + 1);
  };

  return (
    <div className="flex flex-row justify-between items-center bg-zinc-100 w-20 min-w-[5.5rem] rounded-2xl px-1 py-2">
      <button
        aria-label="Minus"
        onClick={handleMinus}
        className="px-1 py-1 rounded-xl hover:scale-90 hover:bg-zinc-200 duration-200"
      >
        <IconMinus stroke={1.5} className="w-5 h-5" />
      </button>

      <div className="text-base">{countNow}</div>

      <button
        aria-label="Plus"
        onClick={handlePlus}
        className="px-1 py-1 rounded-xl hover:scale-90 hover:bg-zinc-200 duration-200"
      >
        <IconPlus stroke={1.5} className="w-5 h-5" />
      </button>
    </div>
  );
};
