import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeTemplateComponent} from './employee-template/employee-template.component';
import { Routes, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

const routes: Routes =
[
  {path: '**', component: EmployeeTemplateComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,MatCardModule]
})
export class AppRoutingModule { }

