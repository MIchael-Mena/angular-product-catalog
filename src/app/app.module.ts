import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './shared/app-routing.module';
import {AppComponent} from './app.component';
import {IconRegistryService} from "./shared/services/icon-registry.service";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "./core/header/header.module";
import {ProductsModule} from "./products/products.module";
import {ShoppingCartService} from "./shared/services/shopping-cart.service";
import {AuthModule} from "./auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundModule} from "./core/page-not-found/page-not-found.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    ProductsModule,
    AuthModule,
    PageNotFoundModule
  ],
  providers: [IconRegistryService, ShoppingCartService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
