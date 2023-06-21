import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISubcategory} from "../model/ISubcategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {IPriceRange} from "../model/IPriceRange";
import {IProduct} from "../model/IProduct";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() subcategories: ISubcategory[] = [];
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>();

  public showRangePrice: boolean = true;
  public showSubcategories: boolean = true;

  private maxPrice: number = 100000000;
  public form: FormGroup = <FormGroup>{};
  private subcategoriesSelected: Map<string, boolean> = new Map<string, boolean>();
  private lastRangePrice: IPriceRange = {min: 0, max: this.maxPrice};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setupForm();
    this.createCheckboxControls();
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
        this.emitFilters();
      }
    });
  }

  public onSubcategoryChange(checked: boolean, subcategory: string): void {
    this.subcategoriesSelected.set(subcategory, checked);
    this.emitFilters();
  }

  private emitFilters(): void {
    this.onFilterChange.emit((products: IProduct[]) => {
      return products.filter((product: IProduct) => {
        return this.filterBySubcategories(product) && this.filterByPriceRange(product);
      });
    });
  }

  private filterBySubcategories(product: IProduct): boolean {
    const selectedSubcategories = Array.from(this.subcategoriesSelected.entries())
      .filter(([subcategory, isSelected]) => isSelected)
      .map(([subcategory]) => subcategory);
    return (
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(product.subcategoria!)
    );
  }

  private filterByPriceRange(product: IProduct): boolean {
    return (
      product.precio >= this.lastRangePrice.min &&
      product.precio <= this.lastRangePrice.max
    );
  }

  private verifyPriceRangeChanged(initialPriceValue: number, finalPriceValue: number): boolean {
    return this.lastRangePrice.min !== initialPriceValue || this.lastRangePrice.max !== finalPriceValue;
  }

  public onPriceChange(): void {
    this.form.updateValueAndValidity();
  }

  public getFormControlName(nombre: string): string {
    return nombre.replace(/\s+/g, '_');
  }

  private setupForm() {
    const priceValidators = [Validators.min(0), Validators.max(this.maxPrice),
      Validators.pattern(/^-?(0|[1-9]\d*)(\.\d+)?$/)];
    this.form = this.fb.group({
      initialPrice: [null, priceValidators],
      finalPrice: [null, priceValidators],
    });
  }

  private createCheckboxControls(): void {
    this.subcategories.forEach((subcategory: ISubcategory) => {
      const controlName = this.getFormControlName(subcategory.nombre);
      this.form.addControl(controlName, this.fb.control(false));
    });
  }

  public clearFilters() {
    this.subcategoriesSelected = new Map<string, boolean>();
    this.form.reset();
    this.lastRangePrice = {min: 0, max: this.maxPrice}; // Restablecer el rango de precios
    this.createCheckboxControls();
    this.emitFilters();
  }
}
