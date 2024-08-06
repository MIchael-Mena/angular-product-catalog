import {IProduct} from "./IProduct";
import {ParamOption} from "./ParamOption";

export interface Filter {

  applyFilter(product: IProduct): boolean

  clearFilter(): void

  get paramOption(): ParamOption

  isActivated(): boolean

}
