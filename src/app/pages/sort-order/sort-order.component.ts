import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { PlayerOffersService } from '../player-offers/player-offers.services';

@Component({
  selector: 'ngx-sort-order',
  templateUrl: './sort-order.component.html',
  styleUrls: ['./sort-order.component.scss']
})
export class SortOrderComponent implements OnInit {

  offers: any;
  sortOrderArray = new Array();
  saveOrderButtonText = "Save sorting order";
  constructor(
    private _playeroffersservice: PlayerOffersService,
    private toastrService: NbToastrService,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.checkLoginInit();
  }

  async checkLoginInit() {
    if(await this.globals.login()) {
      this.offers = this._playeroffersservice.getOffers(1);
      this.offers = this.offers["offers"];
      this.offers.sort((a, b) => (a.offer_sort_order < b.offer_sort_order ? -1 : 1));
      this.offers.map(offer => {
        this.sortOrderArray.push(offer["offer_sort_order"]);
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.offers, event.previousIndex, event.currentIndex);
    console.log(this.offers);
    console.log(this.sortOrderArray);
    this.saveOrderButtonText = "Save Sorting Order";
    for (let index = 0; index < this.offers.length; index++) {
      const element = this.offers[index];
      this.offers[index]["offer_sort_order"] = this.sortOrderArray[index]; 
    }
  }

  saveSortingOrder() {
    this.saveOrderButtonText = "Saved";
    this.showToast('Task successful', 3000, 'info', 'Offers sorted');
  }

  showToast(title, duration, status, errmessage: string) {
    console.log(errmessage)
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }
}
