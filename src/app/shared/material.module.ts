import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const myMaterialModules = [
  MatIconModule,
  BrowserAnimationsModule,
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
