import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root'
})
export class OffersCrudService {

  constructor(private _http: HttpClient, private globals: Globals) { }

  databaseItemsListForDropdown() {
    let _url = this.globals._url + 'admin-panel/webshop_item_type.php';
    let headers = new HttpHeaders();
    let result = this._http.post<any>(_url, "", {headers});
    console.log(result);
    return result;
  }

  getOffers() {
    let offers = [
        {
            "offer_id": "OFF-1000",
            "offer_title": "Diwali Offer",
            "offer_description": "Only for next 10 days!",
            "offer_image": "assets/images/diwali.png",
            "offer_sort_order": 100,
            "content": [{
                "item_id": "ITEM-1",
                "quantity": 10
                }, {
                "item_id": "ITEM-2",
                "quantity": 1
            }],
            "schedule": {
            "days_of_week": [1, 2, 3, 6],
            "dates_of_month": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            "months_of_year": [1]
            },
            "target": "age < 20 and installed_days > 20 or age > 20 and installed_days > 5",
            "pricing": [{
                "currency": "coins",
                "cost": 1000
                }, {
                "currency": "gems",
                "cost": 20
            }]
        },
        {
            "offer_id": "OFF-2000",
            "offer_title": "New Year Offer",
            "offer_description": "Only for next 20 days!",
            "offer_image": "assets/images/newYear.png",
            "offer_sort_order": 10,
            "content": [{
                "item_id": "ITEM-1",
                "quantity": 10
                }, {
                "item_id": "ITEM-2",
                "quantity": 1
            }],
            "schedule": {
            "days_of_week": [1, 2, 3, 6],
            "dates_of_month": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            "months_of_year": [11, 1]
            },
            "target": "age > 30 and installed_days > 5",
            "pricing": [{
                "currency": "coins",
                "cost": 2000
                }, {
                "currency": "gems",
                "cost": 25
            }]
        },
        {
            "offer_id": "OFF-3000",
            "offer_title": "Christmas Offer",
            "offer_description": "Only for next 30 days!",
            "offer_image": "assets/images/christmas.png",
            "offer_sort_order": 1,
            "content": [{
                "item_id": "ITEM-1",
                "quantity": 10
                }, {
                "item_id": "ITEM-2",
                "quantity": 1
            }],
            "schedule": {
            "days_of_week": [1, 2, 3],
            "dates_of_month": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            "months_of_year": [12]
            },
            "target": "age > 30 and installed_days < 5",
            "pricing": [{
                "currency": "coins",
                "cost": 3000
                }, {
                "currency": "gems",
                "cost": 30
            }]
        }
      ]
      return offers;
  }
}
