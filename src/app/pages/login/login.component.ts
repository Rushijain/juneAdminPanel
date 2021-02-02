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
    const player = localStorage.getItem('player');
    if(player != null && player != "") {
      this.router.navigate(['/pages/offers-crud']);
    }
  }

  onSubmit() {    
    // this.loginService.Login(this.id, this.password)
    //   .subscribe(
    //     data => {
    //       this.globals.token = data.token;
    //       localStorage.setItem('email', this.globals.token);
    //       localStorage.setItem('token', (new Date().getTime() / 1000).toString()); 
    //       this.router.navigate(['/pages/home']);
    //     },
    //     error => {
    //       this.showToast('Error occured', 0, 'danger', error.error.message);
    //     },
    //   );
    
    console.log("Inside Login");
    if(this.id == "june" && this.password == "june") {
      let player = {
        player_id: "12345",
        age: 35,
        country: "IN",
        installed_days: 10,
        coins: 10000,
        gems: 2,
        game_level: 10,
        purchaser: false
      }
      localStorage.setItem('player', JSON.stringify(player));
      localStorage.setItem('id', this.id);
      this.router.navigate(['/pages/home']);
    }
    else if(this.id == "rushi" && this.password == "jain") {
      this.router.navigate(['/pages/home']);
    }
    else {
      this.showToast('Error occured', 0, 'danger', "Incorrect username or password");
    }
  }

  showToast(title, duration, status, errmessage: string) {
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }
}
