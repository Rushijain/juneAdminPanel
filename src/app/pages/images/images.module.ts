import { ImagesComponent } from './images.component';
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
  NbCheckboxModule,
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
    NbCheckboxModule,
  ],
  declarations: [
    ImagesComponent,
  ],
  providers: [
  ],
})
export class ImagesModule { }
