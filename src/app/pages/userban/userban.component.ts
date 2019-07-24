import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserbanService } from './userban.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'ngx-userban',
  templateUrl: './userban.component.html',
  styleUrls: ['./userban.component.scss']
})
export class UserbanComponent implements OnInit {

  constructor(private _userbanService: UserbanService, private router: Router, private globals: Globals ) { }
  public user_id: string;
  public user_name: string;
  public response: string;
  routes: Routes = [
    {path: 'login' , component: LoginComponent } ];
  ngOnInit() {
    if (this.globals.token === 'test') {
      this.router.navigate(['pages/login']);
    }
  }

  onsubmit(){
    console.log(this.user_id);
    this._userbanService.BanUserService(this.user_id, this.user_name)
      .subscribe(
        data => {
          console.log("Reached");
        },
        error =>{
          console.log("error");
        }
      );
  }

}
