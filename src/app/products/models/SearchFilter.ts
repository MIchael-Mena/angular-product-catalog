import {IProduct} from "./IProduct";
import {Filter} from "./Filter";
import {unFormatToTextWithUnderscores} from "../../shared/functions/stringUtils";
import {FilterOption} from "./FilterOption";

export class SearchFilter implements Filter {
  private search: string = '';
  private filterToApply: (product: IProduct) => boolean = (product: IProduct) => true;

  constructor() {
  }

  public setParam(search: string): void {
    if (search) {
      // Caso en el que se buscó un producto en el buscador, y mostrar solo el producto
      // 'todos' es el valor que envía finder cuando realiza una búsqueda
      this.search = unFormatToTextWithUnderscores(search);
      this.filterToApply = this.filterBySearch;
    }
  }

  public applyFilter(product: IProduct): boolean {
    return this.filterToApply(product);
  }

  private filterBySearch(product: IProduct): boolean {
    return (
      product.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
      product.subcategoria!.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  private isSearchDefinedNotEmpty(search: string): boolean {
    return search !== undefined && search !== '';
  }

  public clearFilter(): void {
    this.search = '';
  }

  get filterOption(): FilterOption {
    return {name: 'param', value: 'search'};
  }

}
