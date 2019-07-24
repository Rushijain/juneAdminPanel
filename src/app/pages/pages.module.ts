import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { GiftsModule } from './gifts/gifts.module';
import { TournamentModule } from './tournament/tournament.module';
import { UserbanModule } from './userban/userban.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    GiftsModule,
    LoginModule,
    TournamentModule,
    UserbanModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
