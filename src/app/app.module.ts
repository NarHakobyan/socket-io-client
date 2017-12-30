import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarEffect } from '@effects/progress-bar.effect';
import { AppMaterialModule } from '@modules/material/material.module';
import { PouchDbModule } from '@modules/pouchdb/pouchdb.module';
import { SocketModule } from '@modules/socket/socket.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProgressBarReducer } from '@reducers/index';
import { EmitHistoryService } from '@services/emit-history.service';
import { ProgressBarService } from '@services/progress-bar.service';


import { AppComponent } from './app.component';
import { JsonEditorComponent } from './components/jsoneditor/jsoneditor.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SocketTabComponent } from './components/socket-tab/socket-tab.component';

const appReducer = {
  progressBar: ProgressBarReducer.progressBarReducer
};

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    SocketTabComponent,
    JsonEditorComponent
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
    EffectsModule.forRoot([ProgressBarEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [ProgressBarService, EmitHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
