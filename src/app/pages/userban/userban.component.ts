import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserbanService } from './userban.service';
import { LoginComponent } from '../login/login.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-userban',
  templateUrl: './userban.component.html',
  styleUrls: ['./userban.component.scss']
})
export class UserbanComponent implements OnInit {

  constructor(private _userbanService: UserbanService,
              private router: Router,
              private globals: Globals,
              private toastrService: NbToastrService ) { }
  public user_id: string;
  public user_name: string;
  public response: string;
  public formHasError = true;
  routes: Routes = [
    {path: 'login' , component: LoginComponent } ];
  ngOnInit() {
    // if (this.globals.token === 'test') {
    //   this.router.navigate(['pages/login']);
    // }
    this.globals.login();
  }

  validateForm(value1, value2) {
    console.error('in validation' + value1 + '---' + value2 + '---');
    if ((value1 != undefined && value1 != '') || (value2 != undefined && value2 != '')) {
      this.formHasError = false;
    }else {
      this.formHasError = true;
    }
  }

  validateForm123(event: any) {
    console.error('in validation' + event);
  }
  async onsubmit() {
    const status = await this.globals.login();
    console.log(this.user_id);
    if (status != false) {
      this._userbanService.BanUserService(this.user_id, this.user_name)
        .subscribe(
          data => {
            this.showToast('Success', 0, 'success', 'Player Banned');
          },
          error => {
            if (error.code === 16) {
              this.showToast('Error occured', 0, 'danger', error.error.message);
            }
          },
        );
    }
  }

  showToast(title, duration, status, errmessage: string) {
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }

}
