import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../@core/data/smart-table.service';

@Component({
  selector: 'items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {

  ngOnInit() {
  }



  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      itemname: {
        title: 'Item Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      tier: {
        title: 'Tier',
        type: 'string',
      },
      energyrequired: {
        title: 'Energy Required',
        type: 'number',
      },
      effectduration: {
        title: 'Energy Duration',
        type: 'number',
      },
      areaofeffect: {
        title: 'Area of effect',
        type: 'number',
      },
      cooldowntime: {
        title: 'Cooldown Time',
        type: 'number',
      },
      attack: {
        title: 'Attack',
        type: 'number',
      },
      defense: {
        title: 'Defense',
        type: 'number',
      },
      physical: {
        title: 'Physical',
        type: 'number',
      },
      mental: {
        title: 'Mental',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
