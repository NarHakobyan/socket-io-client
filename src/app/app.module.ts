import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventPayloadDialogComponent } from '@components/event-payload/event-payload.component';
import { JsonEditorComponent } from '@components/jsoneditor/jsoneditor.component';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';
import { SocketTabComponent } from '@components/socket-tab/socket-tab.component';
import { EmitHistoryEffect } from '@effects/emit-history.effect';
import { ProgressBarEffect } from '@effects/progress-bar.effect';
import { AppMaterialModule } from '@modules/material/material.module';
import { PouchDbModule } from '@modules/pouchdb/pouchdb.module';
import { SocketModule } from '@modules/socket/socket.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EmitHistoryReducer, ProgressBarReducer, TabsReducer } from '@reducers';
import { EmitHistoryService } from '@services/emit-history.service';
import { ProgressBarService } from '@services/progress-bar.service';


import { AppComponent } from './app.component';

const appReducer = {
  progressBar: ProgressBarReducer.progressBarReducer,
  emitHistory: EmitHistoryReducer.eventHistoryReducer,
  tabs: TabsReducer.tabsReducer
};

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    SocketTabComponent,
    JsonEditorComponent,
    EventPayloadDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SocketModule,
    PouchDbModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ProgressBarEffect, EmitHistoryEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [ProgressBarService, EmitHistoryService],
  bootstrap: [AppComponent],
  entryComponents: [EventPayloadDialogComponent]
})
export class AppModule {
}
