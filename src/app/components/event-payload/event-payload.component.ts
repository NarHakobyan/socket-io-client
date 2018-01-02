import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-event-dialog-payload',
  templateUrl: './event-payload.component.html',
  styleUrls: ['./event-payload.component.scss']
})
export class EventPayloadDialogComponent {

  constructor(public dialogRef: MatDialogRef<EventPayloadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    console.log('onNoClick');
    this.dialogRef.close();
  }

  save(): void {
    console.log('onNoClick');
    this.dialogRef.close();
  }

}
