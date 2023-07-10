import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgOptimizedImage} from "@angular/common";

const myMaterialModules = [
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  NgOptimizedImage,
];

@NgModule(
  {
    imports: [
      myMaterialModules
    ],
    exports: [
      myMaterialModules
    ],
  }
)

export class MaterialModule {
}
