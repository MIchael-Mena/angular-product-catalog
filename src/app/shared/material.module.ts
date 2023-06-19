import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from "@angular/material/divider";

const myMaterialModules = [
  MatIconModule,
  MatButtonModule,
  BrowserAnimationsModule,
  MatDividerModule
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
