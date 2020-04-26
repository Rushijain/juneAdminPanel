import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { MessageService } from './message.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private messageService: MessageService,
              private router: Router,
              private globals: Globals,
              private toastrService: NbToastrService ) { }
  public user_id: string;
  public user_name: string;
  public response: string;
  public formHasError = true;
  routes: Routes = [
    {path: 'message' , component: MessageComponent } ];
  ngOnInit() {
    // if (this.globals.token === 'test') {
    //   this.router.navigate(['pages/login']);
    // }
    this.globals.login();
  }
}
