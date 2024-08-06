import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {Filter} from "../../models/Filter";
import {ISubcategory} from "../../models/ISubcategory";
import {ActivatedRoute, Router} from "@angular/router";

import {combineLatest, debounceTime} from "rxjs";
import {FilterCommunicationService} from "../../services/filter-communication.service";
import {ParamOption} from "../../models/ParamOption";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [FilterCommunicationService]
})
export class FilterComponent implements OnInit, AfterViewInit {
  // ViewChild permite obtener una referencia a un componente hijo, solo a la primera instancia de un componente
  // @ViewChild(PriceRangeComponent, {static: false}) priceFilter!: PriceRangeComponent;
  // @ViewChild(SubcategoryComponent, {static: false}) subcategoryFilter!: SubcategoryComponent;

  private filters: Filter[] = [];
  private initialParamsToRemove: string[] = [];

  @Input() subcategories: ISubcategory[] = [];
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFilterChange: EventEmitter<(products: IProduct[]) => IProduct[]> =
    new EventEmitter<(products: IProduct[]) => IProduct[]>(); // Emite la función que filtra los productos

  constructor(private route: ActivatedRoute, private router: Router,
              private cd: ChangeDetectorRef, private filterService: FilterCommunicationService) {
  }

  ngOnInit(): void {
    this.filterService.getFiltersActivated.subscribe((filters: Filter[]) => {
      this.filters = filters;
    });
    this.filterService.onDeactivateParam.subscribe((param: ParamOption) => {
      this.removeParamsAndEmit([param.name]);
      this.findFilterByParam(param)!.clearFilter();
    });
    this.filterService.onRemoveParam.subscribe((params: ParamOption[]) => {
      // this.updateUrl()
    });
    this.subscribeToParamChanges(); // Si  se usa ViewChild (no se usa addFilter()), entonces debe ir en AfterViewInit
    this.removeParamsAndEmit(this.initialParamsToRemove);

    this.isLoading.emit(false);
  }

  ngAfterViewInit(): void {
    // Se inicializa después de que Angular ha inicializado la vista del componente y las vistas secundarias (hijas)
    // Al utilizar setTimeout con un tiempo de espera de 0 ms, se asegura que las suscripciones y los cambios se
    // realicen después de que Angular haya completado el ciclo de detección de cambios inicial.
    /*    setTimeout(() => {
          this.filters.push(this.priceFilter);
          this.filters.push(this.subcategoryFilter);

        }, 0);*/
    // this.cd.detectChanges(); // Detecta los cambios en la vista del componente (No funciono en este caso)
  }

  private updateUrl(command: string[], queryParams: { [key: string]: string }) {
    this.router.navigate(command,
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge'
      });
    /*    const queryParams = {...this.route.snapshot['queryParams']};
        params.forEach((param: QueryParam) => {
          queryParams[param.name] = param.value;
        });
        this.updateQueryParams(queryParams);*/
  }

  private subscribeToParamChanges() {
    combineLatest([this.route.queryParams, this.route.params])
      .pipe(debounceTime(0)) // Evita que se ejecute 2 veces el código de la suscripción, cuando se recibe una búsqueda
      .subscribe(
        ([queryParams, params]) => {
          console.log('combineLatest');
          this.emitFilters();
        });
  }

  public emitFilters(): void {
    console.log('emitChanges');
    this.onFilterChange.emit((products: IProduct[]) => {
      return this.applyFilters(products);
    });
  }

  private applyFilters(products: IProduct[]): IProduct[] {
    return products.filter((product: IProduct) => {
      return this.filters.every((filter: Filter) => filter.applyFilter(product));
    });
  }

  public clearFiltersAndEmit() {
    this.clearFilters();
    // this.emitFilters();
  }

  private clearFilters(): void {
    const paramsToRemove = this.filters.map((filter: Filter) => {
      filter.clearFilter();
      return filter.paramOption.name
    });
    this.removeParamsAndEmit(paramsToRemove);
    /*    const queryParams = {...this.route.snapshot.queryParams};
        this.filters.forEach((filter: Filter) => {
          filter.clearFilter();
          delete queryParams[filter.paramName];
        });
        this.updateQueryParams(queryParams);*/
  }

  public addParamToRemoveOfUrl(paramName: string): void {
    if (this.isLoading) {
      this.initialParamsToRemove.push(paramName);
    } else {
      this.removeParamsAndEmit([paramName]);
    }
  }

  private removeParamsAndEmit(paramsToRemove: string[]): void {
    const queryParams = {...this.route.snapshot['queryParams']};
    paramsToRemove.forEach((paramName: string) => {
      delete queryParams[paramName];
    });
    this.updateQueryParams(queryParams);
  }

  private updateQueryParams(queryParams: { [key: string]: string | number | boolean }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      // replaceUrl: true
    })
      .then(
        (value => {
            console.log('urlNavigate', value);
          }
        ));
  }

  private findFilterByParam(param: ParamOption): Filter | undefined {
    return this.filters.find((filter: Filter) => filter.paramOption.name === param.name);

  }
}
