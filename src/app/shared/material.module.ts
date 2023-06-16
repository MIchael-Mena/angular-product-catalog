import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

const myMaterialModules = [
  MatIconModule,
  MatButtonModule,
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
