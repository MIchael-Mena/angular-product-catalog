import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "../components/product-listing/product-list/product-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/lista-productos', pathMatch: 'full'},
  {path: 'lista-productos/:subcategory', component: ProductListComponent},
  {path: '**', component: ProductListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
