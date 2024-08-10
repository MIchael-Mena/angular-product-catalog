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
export class PriceRangeComponent implements OnInit, Filter {

  @Output() onInvalidUrl: EventEmitter<string> = new EventEmitter();
  private maxPrice: number = 100000000;
  private lastRangePrice: IPriceRange = {min: 0, max: this.maxPrice};
  public showRangePrice: boolean = true;
  public form: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private filterService: FilterCommunicationService) {
    this.filterService.registerFilter(this);
  }

  ngOnInit(): void {

    this.setupForm();

    this.setupFormChangeSubscription();

    this.route.queryParams.subscribe((params) => {
      const priceRange = params['priceRange'];
      if (priceRange) {
        if (this.verifyFormatPriceRange(priceRange)) {
          // Caso donde la url tiene el parámetro priceRange con un formato correcto al inicializar el componente
          // Se puede poner + antes de la variable para convertir el string a number
          const [initialPrice, finalPrice] = priceRange.split('-').map(Number)

          this.lastRangePrice = {min: initialPrice, max: finalPrice};
          this.form.patchValue({initialPrice, finalPrice}, {emitEvent: false});
          this.filterService.emitFilterChange();
        } else {
          // Caso donde la url tiene el parámetro priceRange con un formato incorrecto, se limpia la url
          // en el padre y se emite un evento para que el padre limpie el filtro
          // this.onInvalidUrl.emit('priceRange');
          console.log('remove price range');
          this.removeQueryParam();
          this.clearFilter();
        }
      } else {
        // Caso donde la url no tiene el parámetro priceRange, se limpia el filtro
        console.log('no priceRange');
        this.clearFilter();
      }
    });
  }

  public removeQueryParam(): void {
    const queryParams = {...this.route.snapshot.queryParams};
    delete queryParams['priceRange'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true
    }).then();
  }

  private setupFormChangeSubscription(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValue) => {
      const initialPriceValue = formValue.initialPrice ? formValue.initialPrice : 0;
      const finalPriceValue = formValue.finalPrice ? formValue.finalPrice : this.maxPrice;
      if (
        this.form.valid && initialPriceValue < finalPriceValue &&
        this.verifyPriceRangeChanged(initialPriceValue, finalPriceValue)
      ) {
        this.updateUrl(initialPriceValue, finalPriceValue);
      }
    });
  }

  private verifyFormatPriceRange(priceRange: string): boolean {
    const priceRangeFormat = /^\d+-\d+$/;
    return priceRangeFormat.test(priceRange);
  }

  private updateUrl(initialPrice: number, finalPrice: number): void {
    console.log('update url');
    const queryParams = {priceRange: `${initialPrice}-${finalPrice}`};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    }).then();
  }

  private verifyPriceRangeChanged(initialPriceValue: number, finalPriceValue: number): boolean {
    return this.lastRangePrice.min !== initialPriceValue || this.lastRangePrice.max !== finalPriceValue;
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
      product.precio >= this.lastRangePrice.min &&
      product.precio <= this.lastRangePrice.max
    );
  }

  public clearFilter(): void {
    // this.lastRangePrice = {min: 0, max: this.maxPrice};
    this.form.reset(
      {initialPrice: 0, finalPrice: 0},
      {emitEvent: false}
    );
    // Si reseteo el form llama a setupFormChangeSubscription y se actualiza la url
    // this.filterService.emitFilterChange(this);
  }

  get paramOption(): ParamOption {
    return {
      name: 'priceRange',
      value: this.lastRangePrice.min + '-' + this.lastRangePrice.max
    };
  }

  public isActivated(): boolean {
    return this.lastRangePrice.min !== 0 || this.lastRangePrice.max !== this.maxPrice;
  }

}