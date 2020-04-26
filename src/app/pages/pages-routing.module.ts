import { HeaderComponent } from './../@theme/components/header/header.component';
import { UserbanComponent } from './userban/userban.component';
import { MessageComponent } from './message/message.component';
import { TournamentComponent } from './tournament/tournament.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { GiftsComponent } from './gifts/gifts.component';
import { NewGiftComponent } from './new-gift/new-gift.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: GiftsComponent,
    },
    {
      path: 'message',
      component: MessageComponent,
    },

    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'tournament',
      component: TournamentComponent,
    },
    {
      path: 'userban',
      component: UserbanComponent,
    },
    {
      path: 'new-gift',
      component: NewGiftComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
