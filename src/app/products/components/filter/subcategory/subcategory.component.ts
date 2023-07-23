import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../models/IProduct";
import {ISubcategory} from "../../../models/ISubcategory";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Filter} from "../../../models/Filter";
import {formatToTextWithoutSpaces, unFormatToTextWithUnderscores} from "../../../../shared/functions/stringUtils";
import {FilterOption} from "../../../models/FilterOption";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit, Filter {

  @Output() onLoadFilter: EventEmitter<Filter> = new EventEmitter();
  @Output() onFilterChange: EventEmitter<number> = new EventEmitter();
  @Input() subcategories: ISubcategory[] = []; // Contiene las subcategorías sin guion bajo
  public form: FormGroup; // Los controles tienen el mismo nombre que los parámetros de la ruta (con guion bajo)
  public showSubcategories: boolean = true;
  private changeCount: number = 0; // para emitir un cambio cuando se inicializa el componente
  public readonly formatToTextWithoutSpaces = formatToTextWithoutSpaces; // Para usarlo en el template

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.onLoadFilter.emit(this);
    this.createCheckboxControls();
    this.route.params.subscribe((params) => {
      // Caso donde viene una subcategoría elegida del menu, y mostrar solo la subcategoría
      if (params['subcategory']) {
        this.clearFilter()
        this.markSubcategory(params['subcategory']);
        this.emitChange();
      }
    });
  }

  public emitChange(): void {
    this.onFilterChange.emit(this.changeCount++);
  }

  public markSubcategory(subcategory: string): void {
    if (this.form.controls.hasOwnProperty(subcategory)) {
      this.form.controls[subcategory].setValue(true);
    } else {
      console.error(`La subcategoría '${subcategory}' no existe`);
    }
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

  get filterOption(): FilterOption {
    return {name: 'subcategory', value: this.form.value};
  }

}
