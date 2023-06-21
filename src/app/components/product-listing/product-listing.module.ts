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

@NgModule({
  declarations: [
    FilterComponent,
    ProductListComponent,
    ProductCardComponent,
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
    FormatPricePipe, NgOptimizedImage
  ],
  providers: [provideNgxMask()]
})
export class ProductListingModule {
}
