import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JsonEditorOptions } from '../../models/json-editor-options';

const JSONEditor = require('jsoneditor');


@Component({
  selector: 'app-json-editor',
  template: '<div></div>'
})
export class JsonEditorComponent implements OnInit {

  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input() text;
  @Output() textChange = new EventEmitter();
  private editor;
  private optionsDiffer: any;
  private dataDiffer: any;

  constructor(private rootElement: ElementRef) {
  }

  ngOnInit() {
    this.editor = new JSONEditor(this.rootElement.nativeElement, this.options, this.text);
    (<any>window).editor = this.editor;
    this.eventToObservable('change').distinctUntilChanged().subscribe(event => {
      if (this.valid()) {
        this.textChange.emit(this.get());
      }
    });
  }

  public collapseAll() {
    this.editor.collapseAll();
  }

  public expandAll() {
    this.editor.expandAll();
  }

  public focus() {
    this.editor.focus();
  }

  public get(): JSON {
    return this.editor.get();
  }

  public getMode(): JsonEditorMode {
    return this.editor.getMode() as JsonEditorMode;
  }

  public getName(): string {
    return this.editor.getName();
  }

  public getText(): string {
    return this.editor.getText();
  }

  public set(json: JSON) {
    this.editor.set(json);
  }

  public setMode(mode: JsonEditorMode) {
    this.editor.setMode(mode);
  }

  public setName(name: string) {
    this.editor.setName(name);
  }

  public valid() {
    try {
      const json = this.editor.getText();
      JSON.parse(json);
      return true;
    } catch (ex) {
      return false;
    }
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  public destroy() {
    this.editor.destroy();
  }

  private eventToObservable(eventName: string): Observable<any> {
    return Observable.create(observer => {
      this.editor.aceEditor.on(eventName, (event) => {
        observer.next(event);
      });
      return () => {
        this.editor.aceEditor.removeListener(eventName);
      };
    });
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';