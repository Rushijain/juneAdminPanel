import { Globals } from './../globals';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ngx-june-home',
  templateUrl: './june-home.component.html',
  styleUrls: ['./june-home.component.scss']
})
export class JuneHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Home Page");
    
  }

}
