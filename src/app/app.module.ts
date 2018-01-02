import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { JsonEditorComponent, HeaderComponent, EventPayloadDialogComponent, ProgressBarComponent } from '@components';
import { PouchDbModule, SocketModule, AppMaterialModule } from '@modules';
import { EmitHistoryService, ProgressBarService } from '@services';
import { ProgressBarEffect, EmitHistoryEffect } from '@effects';
import { SocketTabComponent } from '@containers';


import { AppComponent } from './app.component';
import { appReducer } from '@store';

const rootEffects = [ProgressBarEffect, EmitHistoryEffect];

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    SocketTabComponent,
    JsonEditorComponent,
    EventPayloadDialogComponent,
    HeaderComponent
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
    EffectsModule.forRoot(rootEffects),
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
