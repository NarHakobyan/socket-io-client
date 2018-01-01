import { EventEmitter, Inject, Injectable } from '@angular/core';
import shortId from 'shortid';
import { PouchDbToken } from './pouchdb.token';

@Injectable()
export class PouchDbService {

  private database: PouchDB.Database;
  private isInstantiated: boolean;
  private listener: EventEmitter<any> = new EventEmitter();


  constructor(@Inject(PouchDbToken) PouchDB: PouchDB.Static) {
    if (!this.isInstantiated) {
      this.database = new PouchDB('emitHistory');
      console.log('db===========', this.database);
      (<any>window).database = this.database;
      (<any>window).dbService = this;
      this.isInstantiated = true;
    }
  }


  public fetch() {
    return this.database.allDocs({include_docs: true});
  }

  public get(id: string) {
    return this.database.get(id);
  }

  public put(document: any) {
    if (!document._id) {
      document._id = shortId.generate();
      return this.database.put(document);
    }
    const id = document._id;
    return this.get(id).then(existingDoc => {
      if (existingDoc) {
        document._rev = existingDoc._rev;
      }
      return this.database.put(document);
    });
  }

  remove(id: string) {
    return this.database.get(id).then(doc => this.database.remove(doc));
  }

  public getChangeListener() {
    return this.listener;
  }

}
