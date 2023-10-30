"use client";

import React from "react";

export const CartTypeToggle = () => {
  const [type, setType] = React.useState<"DELIVERY" | "PICKUP">("DELIVERY");

  return (
    <div className="px-0 py-0 flex flex-row gap-0 justify-center bg-zinc-50 rounded-2xl">
      <TypeButton type={"DELIVERY"} typeNow={type} onClick={setType} />
      <TypeButton type={"PICKUP"} typeNow={type} onClick={setType} />
    </div>
  );
};

type TypeButtonProps = {
  type: "DELIVERY" | "PICKUP";
  typeNow: "DELIVERY" | "PICKUP";
  onClick: React.Dispatch<React.SetStateAction<"DELIVERY" | "PICKUP">>;
};

const TypeButton = ({ type, typeNow, onClick }: TypeButtonProps) => {
  let label;

  if (type === "DELIVERY") {
    label = "Delivery";
  }
  if (type === "PICKUP") {
    label = "Self-pickup";
  }

  return (
    <button
      onClick={() => onClick(type)}
      className="w-full px-2 py-2 font-medium rounded-2xl data-[active=true]:bg-gradient-to-br from-yellow-200 via-green-200 to-green-300 hover:bg-zinc-100 hover:scale-95 duration-200"
      data-active={type === typeNow}
    >
      {label}
    </button>
  );
};
