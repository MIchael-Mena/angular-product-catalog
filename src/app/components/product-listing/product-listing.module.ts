import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FilterComponent} from './filter/filter.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialModule} from "../../shared/material.module";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {FormatPricePipe} from "../../pipe/format-price.pipe";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {CardSortingComponent} from './card-sorting/card-sorting.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    FilterComponent,
    ProductListComponent,
    ProductCardComponent,
    CardSortingComponent,
  ],
  exports: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MaterialModule,
    MatCardModule,
    MatDialogModule,
    NgxMaskDirective, NgxMaskPipe,
    FormatPricePipe,
    NgOptimizedImage,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule
  ],
  providers: [provideNgxMask()]
})
export class ProductListingModule {
}
