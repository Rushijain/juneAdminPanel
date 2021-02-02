import { LoginComponent } from './login/login.component';
import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
@Injectable()
export class Globals implements OnInit {
  token: string = localStorage.getItem('token') == null ? 'test' : localStorage.getItem('token');
  _url: string = 'http://34.236.225.127:7350/v2/';
  local_url: string = 'http://127.0.0.1:7350/v2/';
  qa_url: string = 'http://3.81.242.183:7350/v2/';
  prod_url: string = 'http://3.81.242.183:7350/v2/';
  constructor(private _http: HttpClient, private router: Router, private toastrService: NbToastrService) {

  }

  ngOnInit() {
    
  }
  onChangeServer(server: string) {
    // tslint:disable-next-line: triple-equals
    if (server == 'prod') {
      this._url = 'http://3.81.242.183:7350/v2/';
      // tslint:disable-next-line: triple-equals
    }else if (server == 'qa') {
      this._url = 'http://34.236.225.127:7350/v2/';
    }else {
      this._url = 'http://127.0.0.1:7350/v2/';
    }
    // tslint:disable-next-line: no-console
    console.log(this._url);
    this.router.navigate(['pages/login']);
  }

  async login() {
    console.log(localStorage);
    let player = localStorage.getItem('player');      
    
    if(player != null) {
      if(player.length > 0) {
        return true;
      }
      else {
        this.showToast("Error getting credentials", 5000, "danger", "Routing to login");
        console.log("rerouting");
        
        this.router.navigate(['pages/login']);
        return false;
      }
    }
    else {
      this.showToast("Error getting credentials", 5000, "danger", "Routing to login");
        console.log("rerouting");
        
        this.router.navigate(['pages/login']);
        return false;
    } 
  }

  showToast(title, duration, status, errmessage: string) {
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
    }
  }
