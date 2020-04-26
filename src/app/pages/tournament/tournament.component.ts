import { Tournament } from './tournament_model';
import { Component, OnInit } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { TournamentService } from './tournament.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'ngx-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  constructor(private _tournamentService: TournamentService, private router: Router, private globals: Globals ) { }

  routes: Routes = [
    {path: 'login' , component: LoginComponent } ];
  ngOnInit() {
    if (this.globals.token === 'test') {
      this.router.navigate(['pages/login']);
    }
  }

   // tslint:disable-next-line: max-line-length
   tournament = new Tournament('', '', null, null, null, null, null, '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

}
