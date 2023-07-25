import {IProduct} from "./IProduct";
import {Filter} from "./Filter";
import {unFormatToTextWithUnderscores} from "../../shared/functions/stringUtils";
import {FilterOption} from "./FilterOption";
import {ActivatedRoute, Router} from "@angular/router";

export class SearchFilter implements Filter {
  private search: string = '';
  private filterToApply: (product: IProduct) => boolean = (product: IProduct) => true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.subscribeToParamSearchChanges();
  }

  private subscribeToParamSearchChanges() {
    this.route.queryParams.subscribe((params) => {
      this.setParam(params['search']);
    });
  }

  public setParam(search: string): void {
    if (search) {
      this.search = unFormatToTextWithUnderscores(search);
      this.filterToApply = this.filterBySearch;
    } else {
      this.search = '';
      this.filterToApply = (product: IProduct) => true;
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

  public clearFilter(): void {
    // this.search = '';
  }

  get filterOption(): FilterOption {
    return {name: 'param', value: 'search'};
  }

  get paramName(): string {
    return 'search';
  }

}
