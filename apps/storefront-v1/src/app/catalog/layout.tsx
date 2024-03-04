import React from 'react';
import { MainShell } from '../../components/MainShell';
import {
  GetAllMenusInChannel,
  GetChannel,
  GetCheckout,
  GetLocale,
} from '../../client/api';
import { ChannelEmptyBlock } from '../../components/ChannelEmptyBlock';

type CatalogLayoutProps = {
  readonly children: React.ReactNode;
};

export default async function CatalogLayout({ children }: CatalogLayoutProps) {
  const [channel, menus, checkout, locale] = await Promise.all([
    GetChannel(),
    GetAllMenusInChannel(),
    GetCheckout(),
    GetLocale(),
  ]);

  if (!channel || !menus) {
    return <ChannelEmptyBlock locale={locale} />;
  }

  const menu = menus[0];

  return (
    <MainShell channel={channel} menu={menu} checkout={checkout}>
      {children}
    </MainShell>
  );
}
