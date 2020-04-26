import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './../globals';
@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _http: HttpClient, private globals: Globals) { }
}
