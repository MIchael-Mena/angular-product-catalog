import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {ISubcategory} from "../../models/ISubcategory";
import {ActivatedRoute, Router} from "@angular/router";

import {FilterCommunicationService} from "../../services/filter-communication.service";
import {Filter} from "../../models/Filter";

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

  @Input() subcategories: ISubcategory[] = [];
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
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

  /*  private subscribeToParamChanges() {
      combineLatest([this.route.queryParams, this.route.params])
        .pipe(debounceTime(0)) // Evita que se ejecute 2 veces el código de la suscripción, cuando se recibe una búsqueda
        .subscribe(
          ([queryParams, params]) => {
            this.emitFilters();
          });
    }*/

  clearFilters(): void {
    this.router.navigate([], {queryParams: {}}).then();
  }

}