import { UserService } from './../../@core/data/users.service';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { GiftsComponent } from '../gifts/gifts.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  id = '';
  password = '';
  // tslint:disable-next-line: max-line-length
  constructor(private loginService: LoginService, private globals: Globals, private router: Router, private userservice: UserService,
              private toastrService: NbToastrService) { }
  routes: Routes = [
    {path: 'ultras-gifts' , component: GiftsComponent } ];

  ngOnInit() {

  }

  onSubmit() {
    if (this.id == 'admin@gmail.com' && this.password == 'admin@pass123')
    {
    this.loginService.Login()
      .subscribe(
        data => {
          this.globals.token = data.token;
          localStorage.setItem('email', this.globals.token);
          localStorage.setItem('time', (new Date().getTime() / 1000).toString());
          localStorage.setItem('server', this.globals._url);
          localStorage.setItem('token', data.token);
          if (this.globals._url == this.globals.prod_url) {
            localStorage.setItem('server_name', 'prod');
          } else if (this.globals._url == this.globals.qa_url) {
            localStorage.setItem('server_name', 'qa');
          } else if (this.globals._url == this.globals.local_url) {
            localStorage.setItem('server_name', 'local');
          }
          console.log(localStorage);
          let user = { name: 'Ankit', picture: 'assets/images/nick.png'};
          console.log(this.globals.token);
          this.userservice.changeUserName();
          this.router.navigate(['/pages/home']);
        },
        error => {
          this.showToast('Error occured', 0, 'danger', error.error.message);
        },
      );
    } else {
      this.showToast('Error occured', 1000, 'danger', 'Wrong username and password');
    }
  }

  showToast(title, duration, status, errmessage: string) {
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }
}
