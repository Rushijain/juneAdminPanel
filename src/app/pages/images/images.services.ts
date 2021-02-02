import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private _http: HttpClient, private globals: Globals) { }

  getImages() {
      let imagesArry = ['assets/images/diwali.png', 'assets/images/newYear.png', 'assets/images/christmas.png','assets/images/valentine.png'];
      return imagesArry;
  }

}