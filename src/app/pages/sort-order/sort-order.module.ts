import { SortOrderComponent } from './sort-order.component';
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
import {DragDropModule} from '@angular/cdk/drag-drop';

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
    DragDropModule,
  ],
  declarations: [
    SortOrderComponent,
  ],
  providers: [
  ],
})
export class SortOrderModule { }
