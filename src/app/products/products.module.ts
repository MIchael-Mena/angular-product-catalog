import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {MaterialModule} from "../shared/material.module";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {SortSelectorComponent} from './components/sort-selector/sort-selector.component';
import {SharedModule} from "../shared/shared.module";
import {ProductsRoutingModule} from "./products-routing.module";
import {FilterModule} from "./components/filter/filter.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    SortSelectorComponent,
  ],
  exports: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    SharedModule,
    MatCardModule,
    MatDialogModule,
    FilterModule
  ],
  providers: []
})
export class ProductsModule {
}
