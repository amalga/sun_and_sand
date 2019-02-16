import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxGalleryModule } from 'ngx-gallery';
import { RatingModule } from 'ngx-bootstrap/rating';

import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "item",
    pathMatch: "full"
  },
  {
    path: "item",
    component: ItemComponent
  }
];

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    NgxGalleryModule
  ]
})
export class ItemModule { }
