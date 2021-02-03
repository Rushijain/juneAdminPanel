import { PlayerOffersService } from './../player-offers/player-offers.services';
import { OffersCrudService } from './offers-crud.services';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-offers-crud',
  templateUrl: './offers-crud.component.html',
  styleUrls: ['./offers-crud.component.scss']
})
export class OffersCrudComponent implements OnInit {

  offers = new Array();
  offersView = new Array();
  addFormView: boolean;
  pageCount = 1;
  has_more: boolean = false;
  isEdit: boolean = false;
  offerForm: FormGroup;
  items: FormArray;
  addOfferButtonText:string =  "Add new offer";
  filterTitle: string = "";
  filterId: string = "";
  filterTarget: string = "";
  filterDescription: string = "";
  constructor(
    private toastrService: NbToastrService,
    private fb: FormBuilder,
    private _offerCrudService: OffersCrudService,
    private globals: Globals,
    private _playerOffersService: PlayerOffersService
  ) { }
  @ViewChild('offerForm', {static: true}) formValues;

  ngOnInit() {
    this.checkLoginInit();
  }

  async checkLoginInit() {
    if(await this.globals.login()) {
      this.fetchOffers();
    }
  }

  fetchOffers() {
      let page_offers = this._playerOffersService.getOffers(this.pageCount);
      page_offers["offers"].forEach(element => {
        this.offersView.push(true);
        this.offers.push(element);
      });
      this.pageCount = this.pageCount + 1;
      this.has_more = page_offers["has_more"] ? true: false;
      console.log(this.has_more);      
      console.log(this.offers);
  }

  loadMore() {
    this.fetchOffers();
    this.filterOffers();
  }

  filterOffers() {
    console.log(this.filterId);
    console.log(this.filterTitle);
    let offers_copy = this.offers;
    for (let index = 0; index < this.offers.length; index++) {
      const element = this.offers[index];
      if(!this.filterOffersOnId(this.filterId, element) || !this.filterOffersOnTitle(this.filterTitle, element) || !this.filterOffersOnDescription(this.filterDescription, element) || !this.filterOffersOnTarget(this.filterTarget, element)) {
        this.offersView[index] = false;
      }
      else {
        this.offersView[index] = true;
      }
    }
  }

  filterOffersOnId(id, offers_copy) {    
    if(id != "" ) {
      let current_offers_id = offers_copy["offer_id"].replace(/\s/g,'').toLowerCase();
      id = id.replace(/\s/g,'').toLowerCase();
      if(current_offers_id.includes(id)) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  filterOffersOnTitle(title, offers_copy) {    
    if(title != "" ) {
      let current_offers_title = offers_copy["offer_title"].replace(/\s/g,'').toLowerCase();
      title = title.replace(/\s/g,'').toLowerCase();
      console.log(title);
      if(current_offers_title.includes(title)) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  filterOffersOnDescription(description, offers_copy) {    
    if(description != "" ) {
      let current_offers_description = offers_copy["offer_description"].replace(/\s/g,'').toLowerCase();
      description = description.replace(/\s/g,'').toLowerCase();
      console.log(description);
      if(current_offers_description.includes(description)) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  filterOffersOnTarget(target, offers_copy) {
    console.log("Target is -- "+ target);
        
    if(target != "" ) {
      let current_offers_target = offers_copy["target"].replace(/\s/g,'').toLowerCase();
      target = target.replace(/\s/g,'').toLowerCase();
      console.log(target);
      if(current_offers_target.includes(target)) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  clearFilters() {
    this.filterId = "";
    this.filterTitle = "";
    this.filterDescription = "";
    this.filterTarget = "";
    for (let index = 0; index < this.offersView.length; index++) {
      this.offersView[index] = true;      
    }
  }

  createForm() {
    this.offerForm = this.fb.group({
      offer_id: [null, Validators.required],
      offer_title: [null, Validators.required],
      offer_description: [null, Validators.required],
      offer_image: [null, Validators.required],
      offer_sort_order: [null, Validators.required],
      target: [null, Validators.required],
      coinsCost: [null, Validators.required],
      gemsCost: [null, Validators.required],
      days_of_week: [null, Validators.required],
      dates_of_month: [null, Validators.required],
      months_of_year: [null, Validators.required],
      items: this.fb.array([this.createItem()])
    })
  }

  
  createItem(){
    return this.fb.group({
      quantity: [null, Validators.required],
      item_id: [null, Validators.required],
    });
  }

  get getItems() {
    return this.offerForm.get('items') as FormArray;
  }

  addItemToProducts() {
    this.items = this.offerForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  removeItemToProducts() {
    this.items = this.offerForm.get('items') as FormArray;
    if(this.items.length > 1)
    {
      this.items.removeAt(this.items.length - 1)
    }
    else {
      this.showToast("Must have a single item in the form", 5000, "danger", "Error removing item");
    }
  }  

  viewAddOfferForm() {
    if(this.addFormView == true) {
      this.goBack();
    }
    else {
      this.addFormView = true;
      this.addOfferButtonText = "Go back";
      this.createForm();
    }    
  }

  goBack() {
    this.addFormView = false;
    this.addOfferButtonText = "Add New Offer";
    this.isEdit = false;
  }

  //EDIT

  viewEditOfferForm() {
    if(this.addFormView == true) {
      this.goBack();      
    }
    else {
      this.addFormView = true;
      this.addOfferButtonText = "Go back";
      this.isEdit = true;
    } 
  }

  editOffer(offer: any) {
    this.viewEditOfferForm();
    let coinsPrice = 0;
    let gemsPrice = 0;
    let days_of_week = offer.schedule.days_of_week.toString();
    let days_of_month = offer.schedule.dates_of_month.toString();
    let months_of_year = offer.schedule.months_of_year.toString();
    for (let index = 0; index < offer.pricing.length; index++) {
      const element = offer.pricing[index];
      if(element["currency"] == "gems") {
        gemsPrice = element["cost"];      
      }
      else {
        coinsPrice = element["cost"];
      }
    }
    this.offerForm = this.fb.group({
      offer_id: [offer.offer_id, Validators.required],
      offer_title: [offer.offer_title, Validators.required],
      offer_description: [offer.offer_description, Validators.required],
      offer_image: [offer.offer_image, Validators.required],
      offer_sort_order: [offer.offer_sort_order, Validators.required],
      target: [offer.target, Validators.required],
      coinsCost: [coinsPrice, Validators.required],
      gemsCost: [gemsPrice, Validators.required],
      days_of_week: [days_of_week, Validators.required],
      dates_of_month: [days_of_month, Validators.required],
      months_of_year: [months_of_year, Validators.required],
      items: this.fb.array([ ])
    })

    this.items = this.offerForm.get('items') as FormArray;
    offer["content"].forEach(element => {
      this.items.push(this.createItemInEdit(element.quantity, element.item_id));
    })
  }

  createItemInEdit(quantity, item_id){
    return this.fb.group({
      quantity: [quantity, Validators.required],
      item_id: [item_id, Validators.required],
    });
  }

  offerUpload() {
    let values = this.offerForm.value;
    console.log(values);
    console.log(this.offerForm.valid);  
    console.log("is edit on -- " +this.isEdit);
    
    if(this.validate(values)){            
        let schedule = {
          days_of_week: values.days_of_week,
          dates_of_month: values.dates_of_month,
          months_of_year: values.months_of_year
        };
        let pricing = [
          {
            currency: "coins",
            cost: values.coinsCost
          },
          {
            currency: "gems",
            cost: values.gemsCost
          }
        ];
        values["schedule"] = schedule;
        values["pricing"] = pricing;
        values["content"] = values.items
        console.log(values);
        console.log("Edit value is - " + this.isEdit);
        if(this.isEdit) {
          console.log("Editing");      
          for (let index = 0; index < this.offers.length; index++) {
            if(this.offers[index].offer_id == values["offer_id"]) {
              this.offers[index] = values;
              this.showToast("Task successful", 6000, "success", "Offer updated");
              this.goBack();
              break;
            }
          }
        }
        else {          
          this.offers.push(values);
          this.offersView.push(true);
          this.showToast("Task successful", 6000, "success", "Offer added")
          this.goBack();
        }        
    }    
  }

  validate(offer) {
    let errorMsg = null;
    if (offer.offer_title == null || offer.offer_title.length <= 0) {
      errorMsg = "Title is empty";
    }
    else if(offer.offer_description == null || offer.offer_description.length <= 0) {
      errorMsg = "Desription is empty";
    }
    else if((offer.offer_id == null || offer.offer_id.length <= 0)) {
      errorMsg = "Id is empty";
    }
    else if(offer.offer_image == null || offer.offer_image.length <= 0) {
      errorMsg = "Image is empty";
    }
    else if(offer.offer_sort_order == null || offer.offer_sort_order.length) {
      errorMsg = "Sort order is empty";
    }
    else if(offer.coinsCost == null || offer.coinsCost.length <= 0) {
      errorMsg = "Cost of coins is empty";
    }
    else if(offer.gemsCost == null || offer.gemsCost.length <= 0) {
      errorMsg = "Cost of gems is empty";
    }
    else if(offer.days_of_week == null || offer.days_of_week.length <= 0) {
      errorMsg = "Please provide days of week before submitting the form";
    }
    else if(offer.dates_of_month == null || offer.dates_of_month.length <= 0) {
      errorMsg = "Please provide dates of month before submitting the form";
    }
    else if(offer.months_of_year == null || offer.months_of_year.length <= 0) {
      errorMsg = "Please provide months of year before submitting the form";
    }
    else if (offer.target == null || offer.target.length <= 0)
    {
      errorMsg = "Please provide target of year before submitting the form";
    }
    else {
      for (let index = 0; index < offer.items.length; index++) {
        const item = offer.items[index];
        if(item.quantity == null || item.quantity <= 0) {
          errorMsg = "Provide quantity for all items before proceeding";
          break;
        }
        if(item.item_id == null || item.item_id.length <= 0) {
          errorMsg = "Provide id for all items before proceeding";
          break;
        } 
      } 
    }
    if(errorMsg == null) {
      let target = offer.target;
      console.log(target);
      target = target.replace(/\age/gi, 10);
      target = target.replace(/\installed_days/gi, 10);
      target = target.replace(/\game_level/gi, 10);
      target = target.replace(/\purchaser/gi, true);
      target = target.replace(/coins/gi, 10);
      target = target.replace(/\gems/gi, 20);
      target = target.replace(/\and/gi, "&&");
      target = target.replace(/\or/gi, "||");
      console.log(target);
      try {
        eval(target); 
      } catch (e) {          
          errorMsg = "Incorrect format for target";
      }
    }
    if(errorMsg == null || errorMsg != null) {
      offer.days_of_week = offer.days_of_week.replace(/\s/g, "").split(",");
      offer.days_of_week.forEach(day => {
        if(isNaN(day))
        {
          errorMsg = "Incorrect format for days of week";
        }
      });
      console.log(offer.days_of_week);
    }
    if(errorMsg == null || errorMsg != null) {
      offer.dates_of_month = offer.dates_of_month.replace(/\s/g, "").split(",");
      offer.dates_of_month.forEach(day => {
        if(isNaN(day))
        {
          errorMsg = "Incorrect format for dates of month";
        }
      });
    }
    if(errorMsg == null || errorMsg != null) {
      offer.months_of_year = offer.months_of_year.replace(/\s/g, "").split(",");
      offer.months_of_year.forEach(month => {
        if(isNaN(month))
        {
          errorMsg = "Incorrect format for months of year";
        }
      });
    }
    if(errorMsg == null && !this.isEdit) {
      this.offers.forEach(element => {
        if(element.offer_id == offer.offer_id) {
          errorMsg = "Id already exists";   
        }
      });
    }    
    if(errorMsg == null) {
      return true;
    }
    else {
      this.showToast("Error adding offer", 5000, "danger", errorMsg);
    }    
  }

  deleteOffer(index) {
    console.log(index);    
    this.offers.splice(index, 1);
    console.log(this.offers);    
  }

  showToast(title, duration, status, errmessage: string) {
    console.log(errmessage)
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }
}
