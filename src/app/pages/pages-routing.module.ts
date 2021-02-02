import { JuneHomeComponent } from './june-home/june-home.component';
import { PlayerOffersComponent } from './player-offers/player-offers.component';
import { ImagesComponent } from './images/images.component';
import { OffersCrudComponent } from './offers-crud/offers-crud.component';
import { HeaderComponent } from './../@theme/components/header/header.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { SortOrderComponent } from './sort-order/sort-order.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: JuneHomeComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'offers-crud',
      component: OffersCrudComponent,
    }, 
    {
      path: 'images',
      component: ImagesComponent,
    }, 
    {
      path: 'player-offers',
      component: PlayerOffersComponent,
    },
    {
      path: 'sort-order',
      component: SortOrderComponent,
    }, 
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
