import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPriceRange} from "../../../models/IPriceRange";
import {debounceTime} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../../models/IProduct";
import {Filter} from "../../../models/Filter";
import {FilterOption} from "../../../models/FilterOption";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit, Filter {

  @Output() onLoadFilter: EventEmitter<Filter> = new EventEmitter();
  @Output() onFilterChange: EventEmitter<number> = new EventEmitter();
  private maxPrice: number = 100000000;
  private lastRangePrice: IPriceRange = {min: 0, max: this.maxPrice};
  public showRangePrice: boolean = true;
  public form: FormGroup = <FormGroup>{};
  private changeCount: number = 0;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.onLoadFilter.emit(this);
    this.setupForm();
    this.setupFormChangeSubscription();
    console.log(this.route.snapshot.queryParams)
    this.route.queryParams.subscribe((params) => {
      const priceRange = params['priceRange'];
      if (priceRange) {
        if (this.verifyFormatPriceRange(priceRange)) {
          const [initialPrice, finalPrice] = priceRange.split('-');
          if (!this.verifyPriceRangeChanged(+initialPrice, +finalPrice)) {
            return;
          }
          // El + antes de la variable es para convertir el string a number
          this.lastRangePrice = {min: +initialPrice, max: +finalPrice};
          this.form.controls['initialPrice'].setValue(+initialPrice);
          this.form.controls['finalPrice'].setValue(+finalPrice);
          console.log('asignando valores');
        } else {
          // Caso donde la url tiene el parámetro priceRange con un formato incorrecto, se limpia el filtro
          this.clearUrl();
        }
      } else {
        // Caso donde la url no tiene el parámetro priceRange, se limpia el filtro
        this.cleanControlFilter();
      }
    });
  }

  private setupFormChangeSubscription(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValue) => {
      const initialPriceValue = formValue.initialPrice;
      const finalPriceValue = formValue.finalPrice;
      if (this.form.valid && initialPriceValue < finalPriceValue &&
        this.verifyPriceRangeChanged(initialPriceValue, finalPriceValue)
      ) {
        this.lastRangePrice = {min: initialPriceValue, max: finalPriceValue};
        // this.onFilterChange.emit(this.changeCount++);
        console.log('antes de actualizar url');
        this.updateUrl(this.lastRangePrice.min, this.lastRangePrice.max);
      }
    });
  }

  private verifyFormatPriceRange(priceRange: string): boolean {
    const priceRangeFormat = /^\d+-\d+$/;
    return priceRangeFormat.test(priceRange);
  }

  private updateUrl(initialPrice: number, finalPrice: number): void {
    const queryParams = {priceRange: `${initialPrice}-${finalPrice}`};
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: 'merge'});
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
      initialPrice: [null, priceValidators],
      finalPrice: [null, priceValidators],
    });
  }

  public applyFilter(product: IProduct): boolean {
    return (
      product.precio >= this.lastRangePrice.min &&
      product.precio <= this.lastRangePrice.max
    );
  }

  public clearFilter(): void {
    this.clearUrl();
    // this.cleanControlFilter();
  }

  private cleanControlFilter(): void {
    this.lastRangePrice = {min: 0, max: this.maxPrice};
    this.form.reset();
  }

  private clearUrl(): void {
    const queryParams = {...this.route.snapshot.queryParams};
    delete queryParams['priceRange'];
    this.router.navigate([], {relativeTo: this.route, queryParams, replaceUrl: true});
  }

  get filterOption(): FilterOption {
    return {name: 'priceRange', value: this.lastRangePrice.min + '-' + this.lastRangePrice.max};
  }

}
