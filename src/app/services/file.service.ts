import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { first, isEmpty } from 'lodash';

@Injectable()
export class FileService {

  constructor() {
  }

  downloadJson(data: object) {
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    saveAs(blob, 'export.json');
  }

  readJson(target: HTMLInputElement) {
    return new Promise((resolve, reject) => {
      const files = target.files;
      if (!isEmpty(files)) {
        const r = new FileReader();
        r.onload = (e: any) => {
          const contents = e.target.result;
          resolve(JSON.parse(contents));
        };

        r.onerror = e => reject(e);

        r.readAsText(first(files));
      }
    });
  }

}
