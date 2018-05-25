import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { ItemsComponent } from './items.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule
  ],
  declarations: [
    ItemsComponent
  ]
})
export class ItemsModule { }
