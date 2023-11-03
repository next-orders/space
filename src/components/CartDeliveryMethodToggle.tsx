"use client";

import React from "react";
import { Channel, Checkout } from "@next-orders/api-sdk";
import { ChangeCheckoutDeliveryMethod } from "@/server/actions";

type CartTypeToggleProps = {
  channel: Channel | null;
  checkout: Checkout | null;
};

export const CartDeliveryMethodToggle = ({
  channel,
  checkout,
}: CartTypeToggleProps) => {
  const deliveryMethod = checkout?.deliveryMethod || "DELIVERY";

  return (
    <div className="px-0 py-0 flex flex-row gap-0 justify-center bg-zinc-50 rounded-2xl">
      <MethodButton
        method={"DELIVERY"}
        methodNow={deliveryMethod}
        channel={channel}
      />
      <MethodButton
        method={"WAREHOUSE"}
        methodNow={deliveryMethod}
        channel={channel}
      />
    </div>
  );
};

type MethodButtonProps = {
  channel: Channel | null;
  method: Checkout["deliveryMethod"];
  methodNow: Checkout["deliveryMethod"];
};

const MethodButton = ({ channel, method, methodNow }: MethodButtonProps) => {
  const label = getMethodButtonLabel(method);
  const isActive = method === methodNow;

  const backgroundColor = isActive ? channel?.accentButtonColor : "";
  const backgroundImage = isActive
    ? `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`
    : "";

  return (
    <button
      onClick={() => ChangeCheckoutDeliveryMethod("123", method)}
      className="w-full px-2 py-2 font-medium rounded-2xl hover:bg-zinc-100 hover:scale-95 duration-200"
      style={{ backgroundColor, backgroundImage }}
      data-active={isActive}
    >
      {label}
    </button>
  );
};

const getMethodButtonLabel = (method: Checkout["deliveryMethod"]) => {
  if (method === "DELIVERY") return "Delivery";
  if (method === "WAREHOUSE") return "Self-pickup";
};
