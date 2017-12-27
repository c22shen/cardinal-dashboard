import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
})
export class MaterialModule { }
