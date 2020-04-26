import { NewGiftService } from './new-gift.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-new-gift',
  templateUrl: './new-gift.component.html',
  styleUrls: ['./new-gift.component.scss'],
})
export class NewGiftComponent implements OnInit {

  get commonRewards() {
    return this.UserGiftForm.get('common') as FormArray;
  }

  addCommonReward() {
    this.common = this.UserGiftForm.get('common') as FormArray;
    this.common.push(this.createItem());
  }

  get rareRewards() {
    return this.UserGiftForm.get('rare') as FormArray;
  }

  addRareReward() {
    this.rare = this.UserGiftForm.get('rare') as FormArray;
    this.rare.push(this.createItem());
  }

  get epicRewards() {
    return this.UserGiftForm.get('epic') as FormArray;
  }

  addEpicReward() {
    this.epic = this.UserGiftForm.get('epic') as FormArray;
    this.epic.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      CHANCE: Number ,
      COUNT: Number,
    });
  }

  UserGiftForm: FormGroup;
  common: FormArray;
  rare: FormArray;
  epic: FormArray;
  constructor(
    private _newGiftService: NewGiftService,
    private router: Router,
    private globals: Globals,
    private fb: FormBuilder,
    private toastrService: NbToastrService) { }

    arrayItems: {
      id: number;
      title: string;
    }[];

    getId() {
      return this.UserGiftForm.get('Id');
    }

    getUserName() {
      return this.UserGiftForm.get('Name');
    }

   get f() { return this.UserGiftForm.controls; }

  ngOnInit() {
    this.UserGiftForm = this.fb.group({
      Id : [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36) ]],
      Name : [null],
      ucoins : [null],
      ballon_dor : [null],
      common: this.fb.array([ this.createItem() ]),
      rare: this.fb.array([ this.createItem() ]),
      epic: this.fb.array([ this.createItem() ]),
      en_title : [null, Validators.required],
      en_message : [null, Validators.required],
      sp_title : [null, Validators.required],
      sp_message : [null, Validators.required],
      fr_title : [null, Validators.required],
      fr_message : [null, Validators.required],
      ge_title : [null, Validators.required],
      ge_message : [null, Validators.required],
      it_title : [null, Validators.required],
      it_message : [null, Validators.required],
    }, {
      validator : this.IdAndNameValidator,
    });
    this.arrayItems = [];
    this.globals.login();
  }

  IdAndNameValidator(group: FormGroup) {
    // tslint:disable-next-line: triple-equals
    if (group.get('Id').value != '' || group.get('Name').value != '') {
      return null;
    }
    return {hasError : true};
  }

  async onSubmit() {
    const status = await this.globals.login();
    // tslint:disable-next-line: no-console
    console.log('Status is :- ' + status);
    if (status != false) {
      this._newGiftService.uploadGift(this.UserGiftForm.value)
      .subscribe(
        data => {
          this.showToast('Success', 0, 'success', 'Player Rewarded');
          this.UserGiftForm.reset();
        },
        error => {
          console.log(error.error.message);
          this.showToast('Error occured', 0, 'danger', error.error.message);
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
