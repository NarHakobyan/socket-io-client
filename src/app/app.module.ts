import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { JsonEditorComponent, HeaderComponent, EventPayloadDialogComponent, ProgressBarComponent } from '@components';
import { PouchDbModule, SocketModule, AppMaterialModule } from '@modules';
import { SocketTabComponent, TabGroupComponent } from '@containers';
import { environment } from 'environments/environment';
import { reducers, metaReducers } from '@store';


import { TabsService, EmitHistoryService, EmitterService, ProgressBarService } from '@services';
import { ListenerTabGroupComponent } from '@containers/listener-tab-group/listener-tab-group.component';
import { ListenerPageComponent } from '@components/listener-page/listener-page.component';
import { EmitterPageComponent } from '@components/emitter-page/emitter-page.component';
import { CustomReuseStrategy } from 'app/custom-reuse-strategy';
import { AppComponent } from './app.component';
import { appRoutes } from 'app/app.router';

const devModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25 //  Retains last 25 states
  })];

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    SocketTabComponent,
    JsonEditorComponent,
    EventPayloadDialogComponent,
    HeaderComponent,
    TabGroupComponent,
    EmitterPageComponent,
    ListenerPageComponent,
    ListenerTabGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SocketModule,
    PouchDbModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: !environment.production} // <-- debugging purposes only
    ),
    StoreModule.forRoot(reducers, {metaReducers}),
    environment.production ? [] : devModules,
  ],
  providers: [
    ProgressBarService,
    TabsService,
    EmitHistoryService,
    EmitterService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [EventPayloadDialogComponent]
})
export class AppModule {
}
