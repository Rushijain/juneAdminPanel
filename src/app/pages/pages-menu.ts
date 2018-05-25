import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Components',
    group: true,
  },
  {
    title: 'Main Panel',
    icon: 'nb-grid-a',
    children: [
      {
        title: 'Items',
        link: '/pages/items',
      },
    ],
  },
];
