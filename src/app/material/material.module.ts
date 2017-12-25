import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

const modules = [
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {
}
