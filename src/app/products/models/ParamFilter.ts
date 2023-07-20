import {IProduct} from "./IProduct";
import {Filter} from "./Filter";
import {SubcategoryComponent} from "../components/filter/subcategory/subcategory.component";
import {unFormatToTextWithUnderscores} from "../../shared/functions/stringUtils";

export class ParamFilter implements Filter {
  private subcategory: string = '';
  private search: string = '';
  private subcategoryComponent!: SubcategoryComponent;
  private filterToApply: (product: IProduct) => boolean = (product: IProduct) => true;

  constructor(subcategoryComponent: SubcategoryComponent) {
    this.subcategoryComponent = subcategoryComponent;
  }

  public setParams(subcategory: string, search: string): void {
    if (subcategory === 'todos') {
      // Caso en el que se buscó un producto en el buscador, y mostrar solo el producto
      // 'todos' es el valor que envía finder cuando realiza una búsqueda
      this.search = unFormatToTextWithUnderscores(search);
      this.filterToApply = this.filterBySearch;
    } else if (this.isSearchDefinedNotEmpty(subcategory)) {
      // Caso donde viene una subcategoría elegida del menu, y mostrar solo la subcategoría
      this.subcategoryComponent.markSubcategory(subcategory);
      this.subcategory = unFormatToTextWithUnderscores(subcategory);
      this.filterToApply = this.filterBySubcategory;
    }
  }

  applyFilter(product: IProduct): boolean {
    return this.filterToApply(product);
  }

  private isSearchDefinedNotEmpty(search: string): boolean {
    return search !== undefined && search !== '';
  }

  private filterBySubcategory(product: IProduct): boolean {
    // La verificación se está haciendo en SubcategoryComponent
    // return true;
    return this.subcategory.includes(product.subcategoria!);
  }

  private filterBySearch(product: IProduct): boolean {
    return (
      product.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
      product.subcategoria!.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  clearFilter(): void {
    this.subcategory = '';
    this.search = '';
  }

}
