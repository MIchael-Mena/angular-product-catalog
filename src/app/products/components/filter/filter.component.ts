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
import {ActivatedRoute} from "@angular/router";
import {SearchFilter} from "../../models/SearchFilter";
import {SubcategoryComponent} from "./subcategory/subcategory.component";
import {PriceRangeComponent} from "./price-range/price-range.component";
import {combineLatest, debounceTime} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  // ViewChild permite obtener una referencia a un componente hijo, solo a la primera instancia de un componente
  // @ViewChild(PriceRangeComponent, {static: false}) priceFilter!: PriceRangeComponent;
  // @ViewChild(SubcategoryComponent, {static: false}) subcategoryFilter!: SubcategoryComponent;

  private readonly searchFilter: SearchFilter;
  private filters: Filter[] = [];

  @Input() subcategories: ISubcategory[] = [];
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFilterChange: EventEmitter<(products: IProduct[]) => IProduct[]> =
    new EventEmitter<(products: IProduct[]) => IProduct[]>(); // Emite la función que filtra los productos

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.searchFilter = new SearchFilter();
    this.filters.push(this.searchFilter);
  }

  ngOnInit(): void {
    this.subscribeToParamSearchChanges();
    this.subscribeToParamChanges(); // Si se usa ViewChild (no se usa addFilter()), entonces debe ir en AfterViewInit
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

  private subscribeToParamSearchChanges() {
    this.route.queryParams.subscribe((params) => {
      this.searchFilter.setParam(params['search']);
    });
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
    // console.log('applyFilters');
    return products.filter((product: IProduct) => {
      return this.filters.every((filter: Filter) => filter.applyFilter(product));
    });
  }

  public clearFiltersAndEmit() {
    this.clearFilters();
    this.emitFilters();
  }

  private clearFilters(): void {
    this.filters.forEach((filter: Filter) => {
      filter.clearFilter();
    });
  }

  public clearFilter(filter: string): void {
    this.filters.find((f: Filter) => f.filterOption.name === filter)?.clearFilter();
  }

  public addFilter(filter: Filter) {
    this.filters.push(filter);
  }
}
