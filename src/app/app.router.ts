import { Routes } from '@angular/router';
import { EmitterPageComponent } from '@components/emitter-page/emitter-page.component';
import { ListenerPageComponent } from '@components/listener-page/listener-page.component';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'emitter', pathMatch: 'full'},
  {path: 'emitter', component: EmitterPageComponent},
  {path: 'listener', component: ListenerPageComponent},
  {path: '**', redirectTo: 'emitter'}
];
