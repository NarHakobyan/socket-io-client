import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JsonEditorComponent } from '@components/jsoneditor/jsoneditor.component';

@Component({
  selector: 'app-event-dialog-payload',
  templateUrl: './event-payload.component.html',
  styleUrls: ['./event-payload.component.scss']
})
export class EventPayloadDialogComponent {

  @ViewChild(JsonEditorComponent) jsonEditor: JsonEditorComponent;

  constructor(public dialogRef: MatDialogRef<EventPayloadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const data = this.jsonEditor.get();
    this.dialogRef.close({
      update: true,
      data
    });
  }

}
