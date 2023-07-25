import {IProduct} from "./IProduct";
import {QueryParam} from "./QueryParam";

export interface Filter {

  applyFilter(product: IProduct): boolean

  clearFilter(): void

  get paramOption(): QueryParam

  isActivated(): boolean

}
