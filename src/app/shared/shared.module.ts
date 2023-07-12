import {NgModule} from "@angular/core";
import {FormatPricePipe} from "./pipes/format-price.pipe";

@NgModule(
  {
    imports: [
      FormatPricePipe
    ],
    exports: [
      FormatPricePipe
    ],
  }
)

export class SharedModule {
}
