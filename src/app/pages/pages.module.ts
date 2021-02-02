import { JuneHomeModule } from './june-home/june-home.module';
import { SortOrderModule } from './sort-order/sort-order.module';
import { PlayerOffersModule } from './player-offers/player-offers.module';
import { ImagesModule } from './images/images.module';
import { OffersCrudModule } from './offers-crud/offers-crud.module';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SortOrderComponent } from './sort-order/sort-order.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,    
    LoginModule,    
    OffersCrudModule,
    ImagesModule,
    PlayerOffersModule,
    SortOrderModule,
    JuneHomeModule,
  ],
  declarations: [
    PagesComponent,      
  ],
})
export class PagesModule {
}
