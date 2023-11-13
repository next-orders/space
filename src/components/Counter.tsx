import React from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import {
  AddOneToCheckoutLine,
  RemoveOneFromCheckoutLine,
} from "@/server/actions";

type CounterProps = {
  count: number;
  lineId: string;
};

export const Counter = ({ count, lineId }: CounterProps) => {
  return (
    <div className="flex flex-row justify-between items-center bg-zinc-100 w-20 min-w-[5.5rem] rounded-2xl px-1 py-2">
      <button
        aria-label="Minus"
        onClick={async () => await RemoveOneFromCheckoutLine("123", lineId)}
        className="px-1 py-1 rounded-xl hover:scale-90 hover:bg-zinc-200 duration-200"
      >
        <IconMinus stroke={1.5} className="w-5 h-5" />
      </button>

      <div className="text-base">{count}</div>

      <button
        aria-label="Plus"
        onClick={async () => await AddOneToCheckoutLine("123", lineId)}
        className="px-1 py-1 rounded-xl hover:scale-90 hover:bg-zinc-200 duration-200"
      >
        <IconPlus stroke={1.5} className="w-5 h-5" />
      </button>
    </div>
  );
};
