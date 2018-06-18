import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ThemeModule
  ],
  declarations: [ItemsComponent],
  providers: [
    SmartTableService,
  ],
})
export class ItemsModule { }
