import {IProduct} from "./IProduct";

export interface Filter {

  applyFilter(product: IProduct): boolean

  clearFilter(): void

}
