import { LoginComponent } from './../login/login.component';
import { Globals } from './../globals';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Gift } from './gift';
import { GiftsService } from './gifts.service';

@Component({
  selector: 'ngx-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss'],
})
export class GiftsComponent implements OnInit {
  @ViewChild('userForm', {static: true}) formValues;
  public testId = '';
  public idOrNameError = true;
  // tslint:disable-next-line: max-line-length
  private en_title = 'Thank you for Updating Ultras';
  private en_message = ' Fellow Ultras,  We have fixed many bugs and updated the game  With this update, all players will have unique club names We apologize for the change and offer you a small gift in return  Thank you for being loyal fans and active players';  
  // tslint:disable-next-line: max-line-length
  giftModel = new Gift(null, null, null, null, null , null, null, null, null, null, this.en_title, this.en_message, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  form_reset = 1;
  
  constructor(private _gift_service: GiftsService, private router: Router, private globals: Globals ) { }
  // routes: Routes = [
  //   {path: 'login' , component: LoginComponent } ];
  ngOnInit() {
    // if (this.globals.token === 'test') {
    //   this.router.navigate(['pages/login']);
    // }
  }
  get_products(user_id: string, name: string, gold: string, dor: string) {
    // tslint:disable-next-line: no-console
    console.log('11212123121');
    // tslint:disable-next-line: no-console
    console.log(gold);
    // tslint:disable-next-line: no-console
    console.log(name);
  }
  
  checkIdAndName(value1 , value2) {
    console.error('in validation' + value1 + '---' + value2 + '---');
    if ((value1 != undefined && value1 != '') || (value2 != undefined && value2 != '')) {
      this.idOrNameError = false;
    }else {
      this.idOrNameError = true;
    }
  }

  onSubmit(gift: Gift) {
    console.log(this.giftModel.id);
    console.log('gggg');
    this._gift_service.sendActualGift(this.giftModel)
    .subscribe(
      data2 => {
        // tslint:disable-next-line: no-console
        console.log('Success!', data2);
        this.formValues.resetForm();
      },
      error => console.log('Error!', error),
      );
    }
  }

