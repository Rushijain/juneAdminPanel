import { TournamentComponent } from './tournament.component';
import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbInputModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
      TournamentComponent,
  ],
  providers: [
  ],
})

export class TournamentModule { }
