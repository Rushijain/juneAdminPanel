import { ImagesService } from './images.services';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from './../globals';
import { RouterModule, Routes, Router } from '@angular/router';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  images: any;
  fileToUpload: File = null;
  constructor(
    private toastrService: NbToastrService,
    private _imagesService : ImagesService,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.checkLoginInit();
  }

  async checkLoginInit() {
    if(await this.globals.login()) {
      this.images = this._imagesService.getImages();
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  copyFunction(event, index) {
    console.log(this.images[index]);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.images[index];
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showToast('Task successful', 3000, 'info', 'Image Link copied');
  }

  uploadImage(){
    console.log(this.fileToUpload.name);
    this.showToast('Error uploading file', 3000, 'danger', 'No server available');
  }

  showToast(title, duration, status, errmessage: string) {
    console.log(errmessage)
    this.toastrService.show(
      errmessage,
      title,
      { duration, status});
  }
}
