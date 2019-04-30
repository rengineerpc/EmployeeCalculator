import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule, MatGridListModule, MatButtonModule, MatDividerModule,


  MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';


const modules = [
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     modules
  ],
  exports: [
    CommonModule,
    modules
  ]
})
export class MaterialModule { }
