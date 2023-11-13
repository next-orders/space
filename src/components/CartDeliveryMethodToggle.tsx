"use client";

import React from "react";
import { Channel, Checkout } from "@next-orders/api-sdk";
import { ChangeCheckoutDeliveryMethod } from "@/server/actions";
import { getDictionary, Locale } from "@/dictionaries";

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
  const locale = channel?.languageCode || "EN";
  const label = getMethodButtonLabel(method, locale);
  const isActive = method === methodNow;

  const backgroundColor = isActive ? channel?.accentButtonColor : "";
  const backgroundImage = isActive
    ? `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`
    : "";

  return (
    <button
      onClick={() => ChangeCheckoutDeliveryMethod("123", method)}
      className="w-full px-2 py-2 font-normal rounded-2xl hover:bg-zinc-100 hover:scale-95 duration-200"
      style={{ backgroundColor, backgroundImage }}
      data-active={isActive}
    >
      {label}
    </button>
  );
};

const getMethodButtonLabel = (
  method: Checkout["deliveryMethod"],
  locale: Locale,
) => {
  const { DELIVERY_LABEL, SELF_PICKUP_LABEL } = getDictionary(locale);

  if (method === "DELIVERY") return DELIVERY_LABEL;
  if (method === "WAREHOUSE") return SELF_PICKUP_LABEL;
};
