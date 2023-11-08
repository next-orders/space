import React from "react";
import { MainShell } from "@/components/MainShell";
import { GetChannel, GetCheckout, GetShop } from "@/client/api";

type CatalogLayoutProps = {
  children: React.ReactNode;
};

export default async function CatalogLayout({ children }: CatalogLayoutProps) {
  const [shop, channel, checkout] = await Promise.all([
    GetShop(),
    GetChannel(),
    GetCheckout("123"),
  ]);

  return (
    <MainShell shop={shop} channel={channel} checkout={checkout}>
      {children}
    </MainShell>
  );
}
