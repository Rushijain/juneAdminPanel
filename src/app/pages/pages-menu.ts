import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'AllOffers',
    icon: 'gift-outline',
    link: '/pages/offers-crud',
  },
  {
    title: 'Image',
    icon: 'image-outline',
    link: '/pages/images',
  },
  {
    title: 'Player Offers',
    icon: 'person-outline',
    link: '/pages/player-offers',
  },
  {
    title: 'Sort Order',
    icon: 'list-outline',
    link: '/pages/sort-order',
  },
];
