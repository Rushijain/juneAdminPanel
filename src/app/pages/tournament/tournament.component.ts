import { Tournament } from './tournament_model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { TournamentService } from './tournament.service';
import { LoginComponent } from '../login/login.component';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  TournamentForm: FormGroup;
  common_r1: FormArray;
  rare_r1: FormArray;
  epic_r1: FormArray;
  common_r2: FormArray;
  rare_r2: FormArray;
  epic_r2: FormArray;
  common_r3: FormArray;
  rare_r3: FormArray;
  epic_r3: FormArray;
  common_r4: FormArray;
  rare_r4: FormArray;
  epic_r4: FormArray;
  Tournament_data_recived: boolean = false;
  Loading_tournaments_message: string = 'Loading Tournaments...';
  scroll_to_top = false;

  constructor(private _tournamentService: TournamentService,
               private router: Router,
               private globals: Globals,
               private fb: FormBuilder,
               private toastrService: NbToastrService) { }
  @ViewChild('tournamentForm', {static: true}) formValues;
  tournaments: any;
  routes: Routes = [
    {path: 'login' , component: LoginComponent } ];

  ngOnInit() {
    // if (this.globals.token === 'test') {
    //   this.router.navigate(['pages/login']);
    // }

      this.TournamentForm = this.fb.group({
        category : [null, Validators.required],
        title : [null, Validators.required],
        description : [null, Validators.required],
        entry_fees: [null, Validators.required],
        start_time : [null, Validators.required],
        end_time : [null, Validators.required],
        ucoins_r1 : [null, Validators.required],
        ballon_dor_r1 : [null, Validators.required],
        ucoins_r2 : [null, Validators.required],
        ballon_dor_r2 : [null, Validators.required],
        ucoins_r3 : [null, Validators.required],
        ballon_dor_r3 : [null, Validators.required],
        ucoins_r4 : [null, Validators.required],
        ballon_dor_r4 : [null, Validators.required],
        common_r1: this.fb.array([ this.createItem() ]),
        rare_r1: this.fb.array([ this.createItem() ]),
        epic_r1: this.fb.array([ this.createItem() ]),
        common_r2: this.fb.array([ this.createItem() ]),
        rare_r2: this.fb.array([ this.createItem() ]),
        epic_r2: this.fb.array([ this.createItem() ]),
        common_r3: this.fb.array([ this.createItem() ]),
        rare_r3: this.fb.array([ this.createItem() ]),
        epic_r3: this.fb.array([ this.createItem() ]),
        common_r4: this.fb.array([ this.createItem() ]),
        rare_r4: this.fb.array([ this.createItem() ]),
        epic_r4: this.fb.array([ this.createItem() ]),
      });
      this.getTournament();
  }

  async getTournament() {
    const status = await this.globals.login();
    if (status != false) {
      console.log(this.globals._url + 'hey');
      console.info(this.globals.token + 'heyy');
      this._tournamentService.getTournamentData()
        .subscribe(
          data => {
            const re = /\\"/gi;
            this.tournaments = data;
            this.tournaments = this.tournaments.payload.replace(re, '"');
            this.tournaments = JSON.parse(this.tournaments);

            if (this.tournaments.length > 0) {
              this.Tournament_data_recived = true;
            } else {
              this.Loading_tournaments_message = 'No Tournaments Running';
            }
          },
          error => {
          },
        );
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      CHANCE: Number ,
      COUNT: Number,
    });
  }

  async onSubmit() {
    const status = await this.globals.login();
    // tslint:disable-next-line: no-console
    console.log('Status is :- ' + status);
    if (status != false) {
      const temp_form_values = this.TournamentForm.value;
      let flag = false;
      // if (this.tournaments.length > 0) {
      //   for (const entry of this.tournaments) {
      // tslint:disable-next-line: max-line-length
      //     if (entry.category  == temp_form_values.category && (temp_form_values.start_time -  entry.end_time > 9000 )) {
      //       flag = true;
      //     }
      //   }
      // }
      if (flag == false) {
      this._tournamentService.uploadTournament(this.TournamentForm.value)
      .subscribe(
        data => {
          const re = /\\"/gi;
          this.tournaments = data;
          this.tournaments = this.tournaments.payload.replace(re, '"');
          // tslint:disable-next-line: no-console
          console.log('123124123123');
          // tslint:disable-next-line: no-console
          this.tournaments = JSON.parse(this.tournaments);
          this.showToast('Congratulations !!', 0, 'success', 'Tournament Uploaded');
          this.TournamentForm.reset();
          this.Tournament_data_recived = false;
          this.getTournament();
        },
        error => {
          console.log(error.error.message);
          this.showToast('Error occured', 0, 'danger', error.error.message);
        },
      );
      } else {
        this.showToast('Error occured', 0, 'danger', 'Tournament coincides with another tournament');
      }
    }
  }


  showToast(title, duration, status, errmessage: string) {
    console.log(errmessage)
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }

























  /////////////////////////             RIBBON 1           /////////////////////////

  get commonRewardsToR1() {
    return this.TournamentForm.get('common_r1') as FormArray;
  }

  addCommonRewardToR1() {
    this.common_r1 = this.TournamentForm.get('common_r1') as FormArray;
    this.common_r1.push(this.createItem());
  }

  get rareRewardsToR1() {
    return this.TournamentForm.get('rare_r1') as FormArray;
  }

  addRareRewardToR1() {
    this.rare_r1 = this.TournamentForm.get('rare_r1') as FormArray;
    this.rare_r1.push(this.createItem());
  }

  get epicRewardsToR1() {
    return this.TournamentForm.get('epic_r1') as FormArray;
  }

  addEpicRewardToR1() {
    this.epic_r1 = this.TournamentForm.get('epic_r1') as FormArray;
    this.epic_r1.push(this.createItem());
  }

  /////////////////////////             RIBBON 2           /////////////////////////

  get commonRewardsToR2() {
    return this.TournamentForm.get('common_r2') as FormArray;
  }

  addCommonRewardToR2() {
    this.common_r2 = this.TournamentForm.get('common_r2') as FormArray;
    this.common_r2.push(this.createItem());
  }

  get rareRewardsToR2() {
    return this.TournamentForm.get('rare_r2') as FormArray;
  }

  addRareRewardToR2() {
    this.rare_r2 = this.TournamentForm.get('rare_r2') as FormArray;
    this.rare_r2.push(this.createItem());
  }

  get epicRewardsToR2() {
    return this.TournamentForm.get('epic_r2') as FormArray;
  }

  addEpicRewardToR2() {
    this.epic_r2 = this.TournamentForm.get('epic_r2') as FormArray;
    this.epic_r2.push(this.createItem());
  }

  /////////////////////////             RIBBON 3           /////////////////////////

  get commonRewardsToR3() {
    return this.TournamentForm.get('common_r3') as FormArray;
  }

  addCommonRewardToR3() {
    this.common_r3 = this.TournamentForm.get('common_r3') as FormArray;
    this.common_r3.push(this.createItem());
  }

  get rareRewardsToR3() {
    return this.TournamentForm.get('rare_r3') as FormArray;
  }

  addRareRewardToR3() {
    this.rare_r3 = this.TournamentForm.get('rare_r3') as FormArray;
    this.rare_r3.push(this.createItem());
  }

  get epicRewardsToR3() {
    return this.TournamentForm.get('epic_r3') as FormArray;
  }

  addEpicRewardToR3() {
    this.epic_r3 = this.TournamentForm.get('epic_r3') as FormArray;
    this.epic_r3.push(this.createItem());
  }

  /////////////////////////             RIBBON 4           /////////////////////////

  get commonRewardsToR4() {
    return this.TournamentForm.get('common_r4') as FormArray;
  }

  addCommonRewardToR4() {
    this.common_r4 = this.TournamentForm.get('common_r4') as FormArray;
    this.common_r4.push(this.createItem());
  }

  get rareRewardsToR4() {
    return this.TournamentForm.get('rare_r4') as FormArray;
  }

  addRareRewardToR4() {
    this.rare_r4 = this.TournamentForm.get('rare_r4') as FormArray;
    this.rare_r4.push(this.createItem());
  }

  get epicRewardsToR4() {
    return this.TournamentForm.get('epic_r4') as FormArray;
  }

  addEpicRewardToR4() {
    this.epic_r4 = this.TournamentForm.get('epic_r4') as FormArray;
    this.epic_r4.push(this.createItem());
  }
}
