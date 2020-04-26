import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root'
})
export class NewGiftService {

  constructor(private _http: HttpClient, private globals: Globals) { }

  uploadGift(gift: any) {
    let _url = this.globals._url + 'rpc/gift.upload';
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    console.log('Token is' + this.globals.token);
    headers  = headers.append('Authorization', 'Bearer ' + this.globals.token);

    let re = /"/gi;
    let stringToSend = JSON.stringify(gift);
    stringToSend = stringToSend.replace(re, '\\"');
    stringToSend = '"' + stringToSend + '"';
    console.log(stringToSend);
    let result = this._http.post<any>(_url, stringToSend, {headers});
    return result;
  }

}
