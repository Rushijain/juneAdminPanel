import { Globals } from './../globals';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Gift } from './gift';
@Injectable({
  providedIn: 'root',
})
export class GiftsService {
  _url = 'http://127.0.0.1:7350/v2/account/authenticate/device';
  _url2 = 'http://127.0.0.1:7350/v2/rpc/gift.upload';
 // tslint:disable-next-line: max-line-length
  constructor(private _http: HttpClient, private globals: Globals) { }
  sendGift(gift: Gift)
  // tslint:disable-next-line: one-line
  {
    const object = {};
    object['id'] = '01201223124523';
    // tslint:disable-next-line: no-console
    // tslint:disable-next-line: no-console
    console.log(object);
    console.log(gift);

    let headers = new HttpHeaders();
        headers  = headers.append('Content-Type', 'application/json');
        headers  = headers.append('Authorization', 'Basic Z3NnQDEyMyM6');

       let params = new HttpParams();
       params = params.append('create', 'true');
       params = params.append('username', 'rushi');

      // tslint:disable-next-line: prefer-const
      let response = this._http.post<any>(this._url, JSON.stringify(object), {headers, params});
      console.log(response);
      return response;
  }


  sendActualGift(gift: Gift)
  {
    console.log('Reached into second function');
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    headers  = headers.append('Authorization', 'Bearer ' + this.globals.token);
    console.log(gift);
    let re = /"/gi;
    let stringToSend = JSON.stringify(gift);
    console.log(stringToSend);
    stringToSend = stringToSend.replace(re, '\\"');
    // re = /n/gi;
    // stringToSend = stringToSend.replace(re, '\\n');
    stringToSend = '"' + stringToSend + '"';
    console.log(stringToSend);
    // tslint:disable-next-line: no-console
    console.log(headers);
    // tslint:disable-next-line: prefer-const
    let result = this._http.post<any>(this._url2, stringToSend, {headers});
    // tslint:disable-next-line: no-console
    console.log(result);
    return result;
  }
}
