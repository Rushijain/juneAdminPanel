import { UserbanComponent } from './userban/userban.component';
import { TournamentComponent } from './tournament/tournament.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { GiftsComponent } from './gifts/gifts.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'ultras-gifts',
      component: GiftsComponent,
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
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
