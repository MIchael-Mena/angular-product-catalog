import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PriceRangeComponent} from './price-range/price-range.component';
import {FilterComponent} from "./filter.component";
import {SubcategoryComponent} from './subcategory/subcategory.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MaterialModule} from "../../../shared/material.module";


@NgModule({
  declarations: [
    FilterComponent,
    PriceRangeComponent,
    SubcategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCheckboxModule,
    MatExpansionModule,
    NgxMaskDirective, NgxMaskPipe,
    MatChipsModule,
    MatSelectModule,
  ],
  providers: [provideNgxMask()],
  exports: [
    FilterComponent
  ]
})
export class FilterModule {
}
