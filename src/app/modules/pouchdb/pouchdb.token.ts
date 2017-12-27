import { InjectionToken } from '@angular/core';

export let PouchDbToken = new InjectionToken<PouchDB.Static>('PouchDbToken');
