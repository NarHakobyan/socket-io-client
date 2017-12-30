import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatProgressSpinnerModule, MatSelectModule, MatTabsModule, MatToolbarModule
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
  MatProgressSpinnerModule,
  MatListModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {
}
