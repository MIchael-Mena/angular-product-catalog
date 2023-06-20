import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "../../shared/app-routing.module";
import {MaterialModule} from "../../shared/material.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {FinderComponent} from './finder/finder.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UtilityComponent} from './utility/utility.component';
import {FormatPricePipe} from "../../pipe/format-price.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    FinderComponent,
    NavbarComponent,
    UtilityComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatBadgeModule,
    FormatPricePipe
  ],
  exports: [
    HeaderComponent,
    FinderComponent
  ]
})
export class HeaderModule {
}
