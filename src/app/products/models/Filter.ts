import {IProduct} from "./IProduct";
import {FilterOption} from "./FilterOption";

export interface Filter {

  applyFilter(product: IProduct): boolean

  clearFilter(): void

  get filterOption(): FilterOption

}
