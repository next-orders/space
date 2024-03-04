import { MenuItem } from '../types';
import { getLocale } from './locale';
import { getDictionary } from '../dictionaries';

export const GetNavigationMenu = async (): Promise<MenuItem[]> => {
  const locale = getLocale();
  const {
    DASHBOARD_LABEL,
    CHANNELS_LABEL,
    MEDIA_LABEL,
    PRODUCTS_LABEL,
    CLIENTS_LABEL,
    EMPLOYEES_LABEL,
  } = getDictionary(locale);

  return [
    {
      id: '1',
      label: DASHBOARD_LABEL,
      href: '/dashboard',
      icon: 'IconDashboard',
    },
    {
      id: '2',
      label: CHANNELS_LABEL,
      href: '/channel',
      icon: 'IconBuildingStore',
    },
    {
      id: '3',
      label: MEDIA_LABEL,
      href: '/media',
      icon: 'IconPhoto',
    },
    {
      id: '4',
      label: PRODUCTS_LABEL,
      href: '/product',
      icon: 'IconCheese',
    },
    {
      id: '5',
      label: CLIENTS_LABEL,
      href: '/client',
      icon: 'IconUsers',
    },
    {
      id: '6',
      label: EMPLOYEES_LABEL,
      href: '/employee',
      icon: 'IconUserScan',
    },
  ];
};
