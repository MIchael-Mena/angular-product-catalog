import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {Filter} from "../../models/Filter";
import {ISubcategory} from "../../models/ISubcategory";
import {SharedDataService} from "../../../shared/services/shared-data.service";
import {Params} from "@angular/router";
import {ParamFilter} from "../../models/ParamFilter";
import {SubcategoryComponent} from "./subcategory/subcategory.component";
import {PriceRangeComponent} from "./price-range/price-range.component";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  // ViewChild permite obtener una referencia a un componente hijo, solo a la primera instancia de un componente
  @ViewChild(PriceRangeComponent, {static: false}) priceFilter!: PriceRangeComponent;
  @ViewChild(SubcategoryComponent, {static: false}) subcategoryFilter!: SubcategoryComponent;
  private paramFilter!: ParamFilter;

  private filters: Filter[] = [];

  @Input() subcategories: ISubcategory[] = [];
  @Output() onFilterChange: EventEmitter<(products: IProduct[]) => IProduct[]> =
    new EventEmitter<(products: IProduct[]) => IProduct[]>(); // Emite la función que filtra los productos

  constructor(private sharedDataService: SharedDataService<Params>) {
  }

  ngAfterViewInit(): void {
    // Se inicializa después de que Angular ha inicializado la vista del componente y las vistas secundarias
    // Al utilizar setTimeout con un tiempo de espera de 0 ms, se asegura que las suscripciones y los cambios se
    // realicen después de que Angular haya completado el ciclo de detección de cambios inicial.
    setTimeout(() => {
      this.paramFilter = new ParamFilter(this.subcategoryFilter);
      this.subscribeToDataChanges();
      this.filters = [this.priceFilter, this.subcategoryFilter];
    });
  }

  ngOnInit(): void {
  }

  private subscribeToDataChanges() {
    this.sharedDataService.getData.subscribe((data: Params) => {
      this.clearFilters();
      this.paramFilter.setParams(data['subcategory'], data['product'])
      this.onFilterChange.emit((products: IProduct[]) => {
        return products.filter((product: IProduct) => this.paramFilter.applyFilter(product));
      });
    });
  }

  public emitFilters(): void {
    this.paramFilter.clearFilter();
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
    this.emitFilters();
  }

  private clearFilters(): void {
    this.filters.forEach((filter: Filter) => {
      filter.clearFilter();
    });
  }

}
