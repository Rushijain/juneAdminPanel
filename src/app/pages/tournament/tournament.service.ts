import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
import { Tournament } from './tournament_model';
@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _http: HttpClient, private globals: Globals) { }

  uploadTournament(tournament: any) {
    let _url = this.globals._url + 'rpc/dashboard.tournament_upload';
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    console.log('Token is' + this.globals.token);
    headers  = headers.append('Authorization', 'Bearer ' + this.globals.token);

    let re = /"/gi;
    let stringToSend = JSON.stringify(tournament);
    stringToSend = stringToSend.replace(re, '\\"');
    stringToSend = '"' + stringToSend + '"';
    console.log(stringToSend);
    let result = this._http.post<any>(_url, stringToSend, {headers});
    return result;
  }

  getTournamentData() {
    let _url = this.globals._url + 'rpc/dashboard.tournament_list';
    let headers = new HttpHeaders();
    console.info(this.globals.token + 'hey');
    console.info(this.globals._url + 'you know my motivation');
    headers  = headers.append('Content-Type', 'application/json');
    headers  = headers.append('Authorization', 'Bearer ' + this.globals.token);
    // tslint:disable-next-line: quotemark
    let stringToSend = '"{}"';
    let result = this._http.post<any>(_url, stringToSend, {headers});
    return result;
  }
}
