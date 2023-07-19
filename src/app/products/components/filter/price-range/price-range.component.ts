import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IPriceRange} from "../../../models/IPriceRange";
import {debounceTime} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../../models/IProduct";
import {Filter} from "../../../models/Filter";

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit, Filter {

  @Output() onFilterChange: EventEmitter<boolean> = new EventEmitter();
  private maxPrice: number = 100000000;
  private lastRangePrice: IPriceRange = {min: 0, max: this.maxPrice};
  public showRangePrice: boolean = true;
  public form: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setupForm();
    this.setupFormChangeSubscription();
  }

  private setupFormChangeSubscription(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValue) => {
      const initialPriceValue = formValue.initialPrice;
      const finalPriceValue = formValue.finalPrice;

      if (this.form.valid && initialPriceValue < finalPriceValue &&
        this.verifyPriceRangeChanged(initialPriceValue, finalPriceValue)
      ) {
        this.lastRangePrice = {min: initialPriceValue, max: finalPriceValue};
        this.onFilterChange.emit();
      }
    });
  }

  private verifyPriceRangeChanged(initialPriceValue: number, finalPriceValue: number): boolean {
    return this.lastRangePrice.min !== initialPriceValue || this.lastRangePrice.max !== finalPriceValue;
  }

  public onPriceChange(): void {
    this.form.updateValueAndValidity();
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
    this.lastRangePrice = {min: 0, max: this.maxPrice};
    this.form.reset();
  }

}
