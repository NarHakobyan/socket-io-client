import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class FileService {

  constructor() {
  }

  downloadJson(data: object) {
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    saveAs(blob, 'export.json');
  }

}
