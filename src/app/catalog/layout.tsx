import React from "react";
import { MainShell } from "@/components/MainShell";
import { GetChannel } from "@/client/api";
import { GetCheckout } from "@/server/actions";

type CatalogLayoutProps = {
  children: React.ReactNode;
};

export default async function CatalogLayout({ children }: CatalogLayoutProps) {
  const [channel, checkout] = await Promise.all([GetChannel(), GetCheckout()]);

  return (
    <MainShell channel={channel} checkout={checkout}>
      {children}
    </MainShell>
  );
}
