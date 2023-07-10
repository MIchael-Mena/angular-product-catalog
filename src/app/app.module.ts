import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './shared/app-routing.module';
import {AppComponent} from './app.component';
import {IconRegistryService} from "./service/icon-registry.service";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "./components/shared/header/header.module";
import {ProductsModule} from "./components/pages/products/products.module";
import {ShoppingCartService} from "./service/shopping-cart.service";
import {AuthModule} from "./components/pages/auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundModule} from "./components/pages/page-not-found/page-not-found.module";

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
