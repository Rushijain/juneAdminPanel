import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PlayerOffersService } from './player-offers.services';

@Component({
  selector: 'ngx-player-offers',
  templateUrl: './player-offers.component.html',
  styleUrls: ['./player-offers.component.scss']
})
export class PlayerOffersComponent implements OnInit {

  viewData: boolean = false;
  canLoadMore: boolean;
  offers: any;
  player_offers: any = [];
  player: any;
  page_number:number = 1;
  constructor(
    private _playerOffersService: PlayerOffersService,
    private router: Router,
    private globals: Globals,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.checkLoginInit();
  }

  async checkLoginInit() {
    if(await this.globals.login()) {
      this.getOffers();
    }
  }

  getOffers() {
    let page_offers = this._playerOffersService.getOffers(this.page_number);
    this.offers = page_offers["offers"];
    this.page_number = this.page_number + 1;    
    console.log(this.offers);    
    
    this.canLoadMore = page_offers.has_more ? true : false;
    // this.canLoadMore = true;
    console.log(this.offers.has_more);
    
    for (let index = 0; index < this.offers.length; index++) {
      const element = this.offers[index];
      let flag = 0;
      if(this.checkSchedule(element)) {        
        if(this.checkTarget(element.target)) {
          this.player_offers.push(element);
        }
      }      
    }
    console.log(this.player_offers);
    this.viewData = true;
    this.player_offers.sort((a, b) => (a.offer_sort_order < b.offer_sort_order ? -1 : 1));
  }

  checkSchedule(element) {
    let date = new Date()
    let month = date.getUTCMonth() + 1;
    let month_day = date.getUTCDate();
    let week_day = date.getUTCDay();
    if (element.schedule.months_of_year.some(e => e == month)) {
      if ((element.schedule.dates_of_month.some(e => e == month_day)) || (element.schedule.days_of_week.some(e => e == week_day))) {
        return true;
      }      
    }
    return false;
  }

  checkTarget(target: string) {
    this.player = localStorage.getItem('player');
    this.player = JSON.parse(this.player);
    console.log(this.player);

    target = target.replace(/\age/gi, this.player["age"]);
    target = target.replace(/\installed_days/gi, this.player["installed_days"]);
    target = target.replace(/\game_level/gi, this.player["game_level"]);
    target = target.replace(/\purchaser/gi, this.player["purchaser"]);
    target = target.replace(/coins/gi, this.player["coins"]);
    target = target.replace(/\gems/gi, this.player["gems"]);
    target = target.replace(/\and/gi, "&&");
    target = target.replace(/\or/gi, "||");
    console.log(target);
    console.log(eval(target));    
    return eval(target);
  }

  logoutPlayer() {
    localStorage.setItem('player', "");
    this.router.navigate(['/pages/login']);
  }

  buyOffer(currency: string, cost:number) {
    let player = localStorage.getItem("player");
    if(player != null || player.length > 0) {
      player = JSON.parse(player);
      if(currency == "coins") {
        if(player["coins"] < cost) {
          this.showToast("Cannot Buy", 6000, "danger", "Not enough coins");
        }
        else {
          this.showToast("Cannot Buy", 6000, "danger", "Server not available");
        }        
      }
      else {
        if(player["gems"] < cost) {
          this.showToast("Cannot Buy", 6000, "danger", "Not enough gems");
        }
        else {
          this.showToast("Cannot Buy", 6000, "danger", "Server not available");
        } 
      }
    }
  }

  loadMore() {
    this.getOffers();
  }

  showToast(title, duration, status, errmessage: string) {
    console.log(errmessage)
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }

}
