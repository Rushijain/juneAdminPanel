import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient, private globals: Globals) {
  }
  _url = this.globals._url + 'account/authenticate/device';
   Login()
  // tslint:disable-next-line: one-line
  {
    this._url = this.globals._url + 'account/authenticate/device';
    const object = {};
    object['id'] = '01201223124523';
    // tslint:disable-next-line: no-console
    // tslint:disable-next-line: no-console
    console.log(this._url);

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
}
