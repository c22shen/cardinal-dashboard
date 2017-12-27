import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule,
    MatExpansionModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule,
    MatExpansionModule],
})
export class MaterialModule { }
