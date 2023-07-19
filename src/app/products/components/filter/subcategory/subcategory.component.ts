import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../models/IProduct";
import {ISubcategory} from "../../../models/ISubcategory";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Filter} from "../../../models/Filter";
import {formatToTextWithoutSpaces, unFormatToTextWithUnderscores} from "../../../../shared/functions/stringUtils";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit, Filter {

  @Output() onFilterChange: EventEmitter<boolean> = new EventEmitter();
  @Input() subcategories: ISubcategory[] = []; // Contiene las subcategorías sin guion bajo
  public form: FormGroup; // Los controles tienen el mismo nombre que los parámetros de la ruta (con guion bajo)
  public showSubcategories: boolean = true;
  protected readonly formatToTextWithoutSpaces = formatToTextWithoutSpaces; // Para usarlo en el template

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.createCheckboxControls();
  }

  public emitChange(): void {
    this.onFilterChange.emit();
  }

  public markSubcategory(subcategory: string): void {
    this.form.controls[subcategory].setValue(true);
  }

  public clearFilter(): void {
    this.form.reset();
  }

  public applyFilter(product: IProduct): boolean {
    return this.filterBySubcategories(product);
  }

  private filterBySubcategories(product: IProduct): boolean {
    const selectedSubcategories = Object.keys(this.form.controls)
      .filter((controlName) => this.form.controls[controlName].value)
      .map((controlName) => unFormatToTextWithUnderscores(controlName));
    return (
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(product.subcategoria!)
    );
  }

  private createCheckboxControls(): void {
    this.subcategories.forEach((subcategory: ISubcategory) => {
      const controlName = formatToTextWithoutSpaces(subcategory.nombre);
      this.form.addControl(controlName, new FormControl(false));
    });
  }

}
