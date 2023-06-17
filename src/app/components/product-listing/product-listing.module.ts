import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter/filter.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    FilterComponent,
    ProductListComponent,
    ProductCardComponent
  ],
  exports: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCheckboxModule
  ]
})
export class ProductListingModule {
}
