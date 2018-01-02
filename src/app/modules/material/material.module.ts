import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatLineModule, MatListModule, MatTableModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTabsModule,
  MatToolbarModule, MatPaginatorModule
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
  MatSidenavModule,
  MatTableModule,
  MatPaginatorModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {
}
