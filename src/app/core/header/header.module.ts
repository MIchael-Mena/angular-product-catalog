import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SharedModule} from "../../shared/shared.module";

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
    SharedModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSlideToggleModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {
}
