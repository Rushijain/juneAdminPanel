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
    // const local_storage_url = localStorage.getItem('server');
    // if (local_storage_url != null) {
    //   this._url = local_storage_url;
    // }
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
    const email = localStorage.getItem('email');
    if (email == null) {
      this.showToast('Logged out', 3000, 'info', 'Redirecting to login page');
      setTimeout(() => {
        this.router.navigate(['pages/login']);
      }, 3000);
      return false;
    }
    // tslint:disable-next-line: one-line
    else {
      this.token = localStorage.getItem('token');
      console.info(this.token + 'got the token');
      // tslint:disable-next-line: triple-equals
      if (this._url != localStorage.getItem('server')) {
        this.showToast('Logged out', 3000, 'info', 'Redirecting to login page');
        setTimeout(() => {
          this.router.navigate(['pages/login']);
        }, 3000);
        return false;
      }
    }
    const current_time = new Date().getTime() / 1000;
    // tslint:disable-next-line: radix
    console.log(Math.round((current_time - parseInt(localStorage.getItem('time')))));
    if (localStorage.getItem('time') != null) {
      // tslint:disable-next-line: radix
      if (Math.round((current_time - parseInt(localStorage.getItem('time')))) <= 2700) {
        console.info(this.token + 'got the token');
        return true;
      }
    }
    const url = this._url + 'account/authenticate/device';
    const object = {};
    object['id'] = '01201223124523';
    // tslint:disable-next-line: no-console
    // tslint:disable-next-line: no-console
    // console.log(url);

    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    headers  = headers.append('Authorization', 'Basic Z3NnQDEyMyM6');

    let params = new HttpParams();
    params = params.append('create', 'true');
    params = params.append('username', 'rushi');

    try {
      const response = await this._http.post<any>(url, JSON.stringify(object), {headers, params}).toPromise();
      console.log(response);
      this.token = response.token;
      localStorage.setItem('email', this.token);
      localStorage.setItem('time', (new Date().getTime() / 1000).toString());
      localStorage.setItem('server', this._url);
      localStorage.setItem('token', this.token);
      if (this._url == this.prod_url) {
        localStorage.setItem('server_name', 'prod');
      } else if (this._url == this.qa_url) {
        localStorage.setItem('server_name', 'qa');
      } else if (this._url == this.local_url) {
        localStorage.setItem('server_name', 'local');
      }
      return response;
    } catch (e) {
      console.log('Logged out');
      this.showToast('Logged out', 3000, 'info', 'Redirecting to login page');
      setTimeout(() => {
        this.router.navigate(['pages/login']);
      }, 3000);
      return false;
    }
    // response.subscribe(
    //   data => {
    //     console.log(data.token);
    //     this.token = data.token;
    //     return true;
    //   },
    //   error => {
    //     console.log('error occured');
    //     this.showToast(3000, 'danger', 'Redirecting to login page');
    //     setTimeout(() => {
    //       this.router.navigate(['pages/login']);
    //     }, 3000);
    //     return false;
    //   },
    //   );
  }

  showToast(title, duration, status, errmessage: string) {
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
    }
  }
