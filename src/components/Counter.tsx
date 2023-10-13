import { IconMinus, IconPlus } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import React from "react";

type Props = {
  count: number;
};

export const Counter = ({ count }: Props) => {
  const [countNow, setCountNow] = React.useState<number>(count);

  const handleMinus = () => {
    setCountNow((prevState) => (prevState > 0 ? prevState - 1 : 0));
  };

  const handlePlus = () => {
    setCountNow((prevState) => prevState + 1);
  };

  return (
    <div className="flex flex-row justify-between items-center bg-zinc-100 w-20 min-w-[5.5rem] rounded-2xl px-1 py-2">
      <ActionIcon
        variant="transparent"
        aria-label="Minus"
        onClick={handleMinus}
      >
        <IconMinus stroke={1.5} className="w-5 h-5" />
      </ActionIcon>
      <div className="text-sm">{countNow}</div>
      <ActionIcon variant="transparent" aria-label="Plus" onClick={handlePlus}>
        <IconPlus stroke={1.5} className="w-5 h-5" />
      </ActionIcon>
    </div>
  );
};
