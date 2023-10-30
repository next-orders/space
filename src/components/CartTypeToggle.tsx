"use client";

import React from "react";
import { Channel } from "@next-orders/api-sdk";

type CartTypeToggleProps = {
  channel: Channel | null;
};

export const CartTypeToggle = ({ channel }: CartTypeToggleProps) => {
  const [type, setType] = React.useState<"DELIVERY" | "PICKUP">("DELIVERY");

  return (
    <div className="px-0 py-0 flex flex-row gap-0 justify-center bg-zinc-50 rounded-2xl">
      <TypeButton
        type={"DELIVERY"}
        typeNow={type}
        onClick={setType}
        channel={channel}
      />
      <TypeButton
        type={"PICKUP"}
        typeNow={type}
        onClick={setType}
        channel={channel}
      />
    </div>
  );
};

type TypeButtonProps = {
  channel: Channel | null;
  type: "DELIVERY" | "PICKUP";
  typeNow: "DELIVERY" | "PICKUP";
  onClick: React.Dispatch<React.SetStateAction<"DELIVERY" | "PICKUP">>;
};

const TypeButton = ({ channel, type, typeNow, onClick }: TypeButtonProps) => {
  const label = getTypeButtonLabel(type);
  const isActive = type === typeNow;

  const backgroundColor = isActive ? channel?.accentButtonColor : "";
  const backgroundImage = isActive
    ? `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`
    : "";

  return (
    <button
      onClick={() => onClick(type)}
      className="w-full px-2 py-2 font-medium rounded-2xl hover:bg-zinc-100 hover:scale-95 duration-200"
      style={{ backgroundColor, backgroundImage }}
      data-active={isActive}
    >
      {label}
    </button>
  );
};

const getTypeButtonLabel = (type: "DELIVERY" | "PICKUP") => {
  if (type === "DELIVERY") return "Delivery";
  if (type === "PICKUP") return "Self-pickup";
};
