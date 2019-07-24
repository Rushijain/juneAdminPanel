import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url = 'http://127.0.0.1:7350/v2/account/authenticate/device';
  constructor(private _http: HttpClient, private globals: Globals) {
  }

   Login()
  // tslint:disable-next-line: one-line
  {
    const object = {};
    object['id'] = '01201223124523';
    // tslint:disable-next-line: no-console
    // tslint:disable-next-line: no-console
    console.log(object);

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
