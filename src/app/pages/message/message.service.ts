import { Injectable } from '@angular/core';
import { Globals } from './../globals';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  _url2 = 'http://127.0.0.1:7350/v2/rpc/user.ban';
  constructor(private _http: HttpClient, private globals: Globals) { }

  messageService(user_id: string,name: string) {
    console.log('Reached into second function');
    let _url = this.globals._url + 'rpc/user.ban';
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    // headers  = headers.append('Authorization', 'Bearer ' + this.globals.token);
    // tslint:disable-next-line: max-line-length
    headers  = headers.append('Authorization', 'Bearer ' + this.globals.token);
    const  temp_json = {
      // tslint:disable-next-line: quotemark
      "id" : user_id,
      // tslint:disable-next-line: quotemark
      "name" : name,
    };
    const re = /"/gi;
    let stringToSend = JSON.stringify(temp_json);
    console.log(stringToSend);
    stringToSend = stringToSend.replace(re, '\\"');
    // re = /n/gi;
    // stringToSend = stringToSend.replace(re, '\\n');
    stringToSend = '"' + stringToSend + '"';
    console.log(stringToSend);
    // tslint:disable-next-line: no-console
    console.log(headers);
    // tslint:disable-next-line: prefer-const
    let result = this._http.post<any>(_url, stringToSend, {headers});
    // tslint:disable-next-line: no-console
    console.log(result);
    return result;
  }
}
