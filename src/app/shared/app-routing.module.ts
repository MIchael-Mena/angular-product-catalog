import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "../components/pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: '/productos/listado', pathMatch: 'full'},
  {
    path: 'productos',
    loadChildren: () => import('../components/pages/products/products.module').then(m => m.ProductsModule)
  },
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
