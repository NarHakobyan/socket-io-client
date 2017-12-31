import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatLineModule, MatListModule, MatProgressSpinnerModule, MatSelectModule, MatTabsModule, MatToolbarModule
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
  MatLineModule,
  MatDialogModule,
  MatExpansionModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {
}
