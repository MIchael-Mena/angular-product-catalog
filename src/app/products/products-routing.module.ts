import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./pages/product-list/product-list.component";

const routes: Routes = [{
  path: '',
  children: [
    {path: 'listado', component: ProductListComponent},
    {path: 'listado/:subcategory', component: ProductListComponent},
    {path: 'listado/:subcategory/:product', component: ProductListComponent},
    // {path: 'detalle/:id', component: DetailComponent},
    // {path: 'carrito', component: CartComponent},
    // {path: 'agregar-producto', component: AddProductComponent},
    // {path: 'editar-producto/:id', component: EditProductComponent},
    {path: '**', redirectTo: 'listado'}
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
