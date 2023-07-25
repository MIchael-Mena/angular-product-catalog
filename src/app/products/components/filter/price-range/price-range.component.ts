import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPriceRange} from "../../../models/IPriceRange";
import {debounceTime} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../../models/IProduct";
import {Filter} from "../../../models/Filter";
import {QueryParam} from "../../../models/QueryParam";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit, Filter {

  @Output() onInvalidUrl: EventEmitter<string> = new EventEmitter();
  @Output() onLoadFilter: EventEmitter<Filter> = new EventEmitter();
  @Output() onFilterChange: EventEmitter<Filter> = new EventEmitter();
  private maxPrice: number = 100000000;
  private lastRangePrice: IPriceRange = {min: 0, max: this.maxPrice};
  public showRangePrice: boolean = true;
  public form: FormGroup = <FormGroup>{};
  private firstTime: boolean = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.onLoadFilter.emit(this);
    this.setupForm();
    this.setupFormChangeSubscription();
    console.log('priceRange');
    this.route.queryParams.subscribe((params) => {
      const priceRange = params['priceRange'];
      if (priceRange) {
        if (this.verifyFormatPriceRange(priceRange)) {
          // Caso donde la url tiene el parámetro priceRange con un formato correcto al inicializar el componente
          // Se puede poner + antes de la variable para convertir el string a number
          const [initialPrice, finalPrice] = priceRange.split('-').map(Number)

          // Esta línea se vuelven a repetir debido al debounceTime que causa un retraso en la actualización
          // e inicialmente se debe emitir al padre el estado del filtro
          if (this.firstTime) {
            this.lastRangePrice = {min: initialPrice, max: finalPrice};
          }

          this.form.controls['initialPrice'].setValue(initialPrice);
          this.form.controls['finalPrice'].setValue(finalPrice);
        } else {
          // Caso donde la url tiene el parámetro priceRange con un formato incorrecto, se limpia el filtro
          // this.clearUrl();
          this.onInvalidUrl.emit('priceRange');
        }
      } else {
        // Caso donde la url no tiene el parámetro priceRange, se limpia el filtro
        this.cleanControlFilter();
      }
    });
    this.firstTime = false;
  }

  private setupFormChangeSubscription(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValue) => {
      const initialPriceValue = formValue.initialPrice ? formValue.initialPrice : 0;
      const finalPriceValue = formValue.finalPrice ? formValue.finalPrice : this.maxPrice;
      if (
        !this.firstTime &&
        this.form.valid && initialPriceValue < finalPriceValue &&
        this.verifyPriceRangeChanged(initialPriceValue, finalPriceValue)
      ) {
        this.lastRangePrice = {min: initialPriceValue, max: finalPriceValue};
        this.updateUrl(this.lastRangePrice.min, this.lastRangePrice.max);
        this.onFilterChange.emit(this);
      }
    });
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
    });
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
      initialPrice: [0, priceValidators],
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
    // this.clearUrl();
    // this.cleanControlFilter();
  }

  private cleanControlFilter(): void {
    this.lastRangePrice = {min: 0, max: this.maxPrice};
    this.form.reset();
  }

  private clearUrl(): void {
    const queryParams = {...this.route.snapshot.queryParams};
    delete queryParams['priceRange'];
    // console.log('priceRange', this.route.url);
    this.router.navigate([], {relativeTo: this.route, queryParams, replaceUrl: true}).then(
      (value => {
          console.log('priceRange', value);
        }
      ));
  }

  get paramOption(): QueryParam {
    return {name: 'priceRange', value: this.lastRangePrice.min + '-' + this.lastRangePrice.max};
  }

  public isActivated(): boolean {
    return this.form.controls['initialPrice'].value !== 0 || this.form.controls['finalPrice'].value !== 0;
  }

}
