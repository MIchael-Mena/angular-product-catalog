import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter/filter.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialModule} from "../../shared/material.module";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";


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
    MatCheckboxModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()]
})
export class ProductListingModule {
}
