import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Tournament',
    icon: 'award',
    link: '/pages/tournament',
  },
  {
    title: 'User Ban',
    icon: 'scissors-outline',
    link: '/pages/userban',
  },
  {
    title: 'Give a gift',
    icon: 'gift-outline',
    link: '/pages/new-gift',
  },
];
