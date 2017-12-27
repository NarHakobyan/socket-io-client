import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppMaterialModule } from './modules/material/material.module';
import { PouchDbModule } from './modules/pouchdb/pouchdb.module';
import { SocketModule } from './modules/socket/socket.module';

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
    PouchDbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
