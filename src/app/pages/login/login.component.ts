import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { GiftsComponent } from '../gifts/gifts.component';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  id = '';
  password = '';
  constructor(private loginService: LoginService, private globals: Globals,private router: Router) { }
  routes: Routes = [
    {path: 'ultras-gifts' , component: GiftsComponent } ];

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.Login()
      .subscribe(
        data => {
          this.globals.token = data.token;
          console.log(this.globals.token);
          this.router.navigate(['/pages/ultras-gifts']);
        },
        error =>{
          console.log("error occured");
        }
      );
  }
}
