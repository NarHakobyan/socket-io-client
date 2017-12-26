import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import PouchDB from 'pouchdb';

import { PouchDbService } from './pouchdb.service';
import { PouchDbToken } from './pouchdb.token';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: PouchDbToken, useValue: PouchDB
  }, PouchDbService],
  declarations: []
})
export class PouchDbModule {
}
