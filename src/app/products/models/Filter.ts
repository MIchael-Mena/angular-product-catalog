import {IProduct} from "./IProduct";
import {ParamOption} from "./ParamOption";
import {ActivatedRoute, Router} from "@angular/router";

export abstract class Filter {

  protected route: ActivatedRoute;
  protected router: Router;

  protected constructor(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.router = router;
  }

  abstract applyFilter(product: IProduct): boolean

  abstract clearFilter(): void

  abstract get paramOption(): ParamOption

  abstract isActivated(): boolean

  removeQueryParam(queryName: string): void {
    const queryParams = {...this.route.snapshot.queryParams};
    delete queryParams[queryName];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true
    }).then();
  }

}
