import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISubcategory} from "../model/ISubcategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {IPriceRange} from "../model/IPriceRange";
import {IProduct} from "../model/IProduct";
import {SharedDataService} from "../../../service/shared-data.service";
import {IParamFilter} from "../model/IParamFilter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() subcategories: ISubcategory[] = []; // Contiene las subcategorías sin guión bajo
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup = <FormGroup>{}; // Los controles tienen el mismo nombre que los parámetros de la ruta (con guión bajo)
  public showRangePrice: boolean = true;
  public showSubcategories: boolean = true;

  private subcategory: string = '';
  private product: string = '';
  private maxPrice: number = 100000000;
  private subcategoriesSelected: Map<string, boolean> = new Map<string, boolean>();
  private lastRangePrice: IPriceRange = {min: 0, max: this.maxPrice};

  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService) {
  }

  ngOnInit(): void {
    this.setupForm();
    this.createCheckboxControls();
    this.setupFormChangeSubscription();
    this.subscribeToDataChanges();
  }

  private subscribeToDataChanges() {
    this.sharedDataService.getData.subscribe((data: IParamFilter) => {
      this.subcategory = data.subcategory;
      this.product = data.product;
      if (this.subcategory === 'todos') {
        // 'todos' es el valor que envía finder cuando realiza una búsqueda
        this.resetSubcategories();
      } else if (this.isValueDefinedNotEmpty(this.subcategory)) {
        // Si recibimos una subcategoría, debemos reiniciar los filtros y mostrar solo la subcategoría
        this.clearFilters()
        this.selectSubcategory();
        this.emitFilters();
      }
      if (this.isValueDefinedNotEmpty(this.product)) {
        // Si recibimos la búsqueda de un producto, debemos reiniciar los filtros y mostrar solo el producto
        this.resetFilterData()
        this.emitFilters()
      }
    });
  }

  private resetSubcategories() {
    this.subcategoriesSelected.forEach((value, key) => {
      this.subcategoriesSelected.set(key, false);
      this.form.controls[this.formatToTextWithoutSpaces(key)].setValue(false);
    });
  }

  private selectSubcategory() {
    this.subcategoriesSelected.set(this.unFormatToTextWithUnderscores(this.subcategory), true);
    this.form.controls[this.subcategory].setValue(true);
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
    this.product = '';
    this.emitFilters();
  }

  private emitFilters(): void {
    this.onFilterChange.emit((products: IProduct[]) => {
      return products.filter((product: IProduct) => {
        return this.filterBySubcategories(product) &&
          this.filterByPriceRange(product) && this.filterByProduct(product);
      });
    });
  }

  private filterByProduct(product: IProduct): boolean {
    return (
      (this.product === '' || this.product === undefined) || (
        product.nombre.toLowerCase().includes(this.product.toLowerCase()) ||
        product.subcategoria!.toLowerCase().includes(this.product.toLowerCase())
      )
    );
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
      const controlName = this.formatToTextWithoutSpaces(subcategory.nombre);
      this.form.addControl(controlName, this.fb.control(false));
    });
  }

  public clearFiltersAndEmit() {
    this.clearFilters();
    this.emitFilters();
  }

  private clearFilters() {
    this.resetFilterData();
    this.product = '';
  }

  private resetFilterData() {
    this.subcategoriesSelected = new Map<string, boolean>();
    this.form.reset();
    this.lastRangePrice = {min: 0, max: this.maxPrice}; // Restablecer el rango de precios
  }

  public formatToTextWithoutSpaces(nombre: string): string {
    return nombre.replace(/\s+/g, '_');
  }

  private unFormatToTextWithUnderscores(text: string): string {
    return text.replace(/_/g, ' ');
  }

  private isValueDefinedNotEmpty(item: string): boolean {
    return item !== undefined && item !== '';
  }

}
