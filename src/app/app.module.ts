import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarEffect } from '@effects/progress-bar.effect';
import { SocketIoEffect } from '@effects/socket-io.effect';
import { AppMaterialModule } from '@modules/material/material.module';
import { PouchDbModule } from '@modules/pouchdb/pouchdb.module';
import { SocketModule } from '@modules/socket/socket.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProgressBarReducer, SocketIoReducer } from '@reducers/index';
import { ProgressBarService } from '@services/progress-bar.service';


import { AppComponent } from './app.component';

const appReducer = {
  progressBar: ProgressBarReducer.progressBarReducer,
  socketIo: SocketIoReducer.socketIoReducer,
};

@NgModule({
  declarations: [
    AppComponent
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
    EffectsModule.forRoot([ProgressBarEffect, SocketIoEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [ProgressBarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
