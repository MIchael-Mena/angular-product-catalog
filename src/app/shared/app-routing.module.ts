import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "../core/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: '/productos/listado', pathMatch: 'full'},
  {
    path: 'productos',
    loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
  },
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true} // Para evitar recargar la página cuando el usuario escriba manualmente la ruta
  )],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
