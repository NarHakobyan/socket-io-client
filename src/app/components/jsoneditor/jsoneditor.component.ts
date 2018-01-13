import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

import { JsonEditorOptions } from '@models/json-editor-options';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { isEmpty, isNull } from 'lodash';

const JSONEditor = require('jsoneditor');


@Component({
  selector: 'app-json-editor',
  template: '<div></div>'
})
export class JsonEditorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input() defaultBody;
  @Output() bodyChange = new EventEmitter();

  private editor;
  private optionsDiffer: any;
  private dataDiffer: any;
  private _subscriptions: Subscription[] = [];

  constructor(private rootElement: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultBody.currentValue && isNull(changes.defaultBody.previousValue)) {
      this.destroy();
      this.initEditor();
    }
  }

  set subscriptions(value: Subscription) {
    this._subscriptions.push(value);
  }

  ngOnInit() {
    this.initEditor();
  }

  public destroy() {
    if (!isEmpty(this.editor)) {
      this.editor.destroy();
    }
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
      return JSON.parse(json);
    } catch (ex) {
      return null;
    }
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  private initEditor() {
    this.editor = new JSONEditor(this.rootElement.nativeElement, this.options, this.defaultBody);
    this.subscriptions = this.eventToObservable('change').subscribe(event => {
      const value = this.valid();
      if (value) {
        this.bodyChange.emit(value);
      }
    });
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

  ngOnDestroy(): void {
    this._subscriptions.map(subscription => {
      subscription.unsubscribe();
    });
    this.destroy();
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';
