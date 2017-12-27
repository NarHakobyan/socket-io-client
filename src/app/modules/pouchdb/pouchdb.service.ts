import { Inject, Injectable } from '@angular/core';
import { PouchDbToken } from './pouchdb.token';

@Injectable()
export class PouchDbService {

  private db: PouchDB.Database;

  constructor(@Inject(PouchDbToken) PouchDB: PouchDB.Static) {
    this.db = new PouchDB('kittens');
    console.log('db===========', this.db);
    (<any>window).db = this.db;
  }

}
