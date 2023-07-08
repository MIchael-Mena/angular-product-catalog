import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './shared/app-routing.module';
import {AppComponent} from './app.component';
import {IconRegistryService} from "./service/icon-registry.service";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "./components/header-module/header.module";
import {ProductListingModule} from "./components/product-listing/product-listing.module";
import {ShoppingCartService} from "./service/shopping-cart.service";
import {LoginRegisterModule} from "./components/login-register/login-register.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    ProductListingModule,
    LoginRegisterModule
  ],
  providers: [IconRegistryService, ShoppingCartService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
