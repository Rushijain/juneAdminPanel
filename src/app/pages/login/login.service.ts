import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient, private globals: Globals) {
  }  
  
  // Login() {
  //   let _url = this.globals._url + 'admin-panel/webshop_item_create.php';
  //   let headers = new HttpHeaders();
  //   var jsonToSend = {
  //     type : type,
  //     item_id : id,
  //     title : title
  //   } 
  //   console.log(jsonToSend);
  //   let result = this._http.post<any>(_url, JSON.stringify(jsonToSend), {headers});
  //   console.log(result);
  //   return result;
  // }
    
}
