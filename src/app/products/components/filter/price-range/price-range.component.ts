import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IPriceRange} from "../../../models/IPriceRange";
import {debounceTime} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../../models/IProduct";
import {Filter} from "../../../models/Filter";
import {ParamOption} from "../../../models/ParamOption";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterCommunicationService} from "../../../services/filter-communication.service";

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent extends Filter implements OnInit {

  @Output() onInvalidUrl: EventEmitter<string> = new EventEmitter();
  private maxPrice: number = 100000000;
  private lastValidRangePrice: IPriceRange = {min: 0, max: this.maxPrice};
  public showRangePrice: boolean = true;
  public form: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder, route: ActivatedRoute,
              router: Router, private filterService: FilterCommunicationService) {
    super(route, router);
    this.filterService.registerFilter(this);
  }

  ngOnInit(): void {
    this.setupForm();
    this.subscribeToFormChanges();
    this.initializePriceRangeFromUrl();
  }

  private initializePriceRangeFromUrl() {
    this.route.queryParams.subscribe((params) => {
      const priceRange = params['priceRange'];
      if (priceRange) {
        // Se puede poner + antes de la variable para convertir el string a number
        const [initialPrice, finalPrice] = priceRange.split('-').map(Number)
        if (this.verifyFormatPriceRange(priceRange) && this.validatePrinceRange(initialPrice, finalPrice)) {
          // Caso donde la url tiene el parámetro priceRange con un formato correcto al inicializar el componente
          this.lastValidRangePrice = {min: initialPrice, max: finalPrice};
          this.form.patchValue({initialPrice, finalPrice}, {emitEvent: false});
          this.filterService.emitFilterChange();
        } else {
          // Caso donde la url tiene el parámetro priceRange con un formato incorrecto, se limpia la url
          this.removeQueryParam('priceRange');
          this.clearFilter();
        }
      } else {
        // Caso donde la url no tiene el parámetro priceRange, se limpia el filtro
        this.clearFilter();
      }
    });
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValue) => {
      const initialPriceValue = formValue.initialPrice ? formValue.initialPrice : 0;
      const finalPriceValue = formValue.finalPrice ? formValue.finalPrice : this.maxPrice;
      if (this.validatePrinceRange(initialPriceValue, finalPriceValue)) {
        this.updateUrl(initialPriceValue, finalPriceValue);
      }
    });
  }

  private validatePrinceRange(initialPriceValue: number, finalPriceValue: number): boolean {
    return this.form.valid && initialPriceValue < finalPriceValue &&
      this.verifyPriceRangeChanged(initialPriceValue, finalPriceValue)
  }

  private verifyFormatPriceRange(priceRange: string): boolean {
    const priceRangeFormat = /^\d+-\d+$/;
    return priceRangeFormat.test(priceRange);
  }

  private updateUrl(initialPrice: number, finalPrice: number): void {
    const queryParams = {priceRange: `${initialPrice}-${finalPrice}`};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    }).then();
  }

  private verifyPriceRangeChanged(initialPriceValue: number, finalPriceValue: number): boolean {
    return this.lastValidRangePrice.min !== initialPriceValue || this.lastValidRangePrice.max !== finalPriceValue;
  }

  public onPriceChange(): void {
    // this.form.updateValueAndValidity();
  }

  private setupForm(): void {
    const priceValidators = [Validators.min(0), Validators.max(this.maxPrice),
      Validators.pattern(/^-?(0|[1-9]\d*)(\.\d+)?$/)];
    this.form = this.fb.group({
      initialPrice: [0, priceValidators], // El primer valor del array es el valor por defecto que tendrá el input
      finalPrice: [0, priceValidators],
    });
  }

  public applyFilter(product: IProduct): boolean {
    return (
      product.precio >= this.lastValidRangePrice.min &&
      product.precio <= this.lastValidRangePrice.max
    );
  }

  public clearFilter(): void {
    this.form.reset(
      {initialPrice: 0, finalPrice: 0},
      {emitEvent: false} // No emite el evento de cambio de valor, para evitar ejecutar setupFormChangeSubscription
    );
  }

  get paramOption(): ParamOption {
    return {
      name: 'priceRange',
      value: this.lastValidRangePrice.min + '-' + this.lastValidRangePrice.max
    };
  }

  public isActivated(): boolean {
    return this.lastValidRangePrice.min !== 0 || this.lastValidRangePrice.max !== this.maxPrice;
  }

}