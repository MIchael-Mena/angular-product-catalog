import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../models/IProduct";
import {ISubcategory} from "../../../models/ISubcategory";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Filter} from "../../../models/Filter";
import {formatToTextWithUnderscores, unFormatToTextWithUnderscores} from "../../../../shared/functions/stringUtils";
import {ParamOption} from "../../../models/ParamOption";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterCommunicationService} from "../../../services/filter-communication.service";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent extends Filter implements OnInit {

  @Output() onParamToggle: EventEmitter<string> = new EventEmitter<string>();
  @Input() subcategories: ISubcategory[] = []; // Contiene las subcategorías sin guion bajo
  public form: FormGroup; // Los controles tienen el mismo nombre que los parámetros de la ruta (con guion bajo)
  public showSubcategories: boolean = true;
  private selectedSubcategories: string[] = [];
  public readonly formatToTextWithoutSpaces = formatToTextWithUnderscores; // Para usarlo en el template

  constructor(private fb: FormBuilder, private filterService: FilterCommunicationService,
              route: ActivatedRoute, router: Router) {
    super(route, router);
    this.form = this.fb.group({});
    this.filterService.registerFilter(this);
  }

  ngOnInit(): void {
    this.createCheckboxControls();

    const subcategory = this.route.snapshot.params['subcategory']
    const subcategories = this.route.snapshot.queryParams['subcategories']
    if (subcategory) {
      // Caso donde viene una subcategoría elegida del menu, y mostrar solo la subcategoría
      if (this.markSubcategory(subcategory)) {
        this.filterService.emitFilterChange();
      }
    } else if (subcategories) {
      const subcategoriesArray = subcategories.split(',')
      subcategoriesArray.forEach((subcategory: string) => {
        this.markSubcategory(subcategory)
      });
      this.filterService.emitFilterChange();
    }
  }

  public emitChange(): void {
    this.selectedSubcategories = Object.keys(this.form.controls)
      .filter((controlName) => this.form.controls[controlName].value)
    // .map((controlName) => unFormatToTextWithUnderscores(controlName));

    this.updateRoute();

    this.filterService.emitFilterChange();
  }

  private updateRoute(): void {
    // Elimina el parámetro subcategory ej '../subcategory' -> '..'
    const command: string[] = this.route.snapshot.params['subcategory'] ? ['..'] : [];
    if (this.selectedSubcategories.length === 0) {
      const queryParams = {...this.route.snapshot.queryParams};
      delete queryParams['subcategories'];
      this.router.navigate(command, {relativeTo: this.route, queryParams}).then();
    } else {
      const queryParams = {subcategories: this.selectedSubcategories.join(',')};
      this.router.navigate(command,
        {
          relativeTo: this.route,
          queryParams,
          queryParamsHandling: 'merge'
        }
      ).then();
    }
  }

  public markSubcategory(subcategory: string): boolean {
    if (this.form.controls.hasOwnProperty(subcategory)) {
      this.form.controls[subcategory].setValue(true);
      this.selectedSubcategories.push(subcategory);
      return true;
    } else {
      // console.error(`La subcategoría '${subcategory}' no existe`);
      return false;
    }
  }

  public clearFilter(): void {
    this.form.reset();
    this.selectedSubcategories = [];
// this.updateRoute();
    console.log('clear filter', this.selectedSubcategories)
  }

  public applyFilter(product: IProduct): boolean {
    return (
      this.selectedSubcategories.length === 0 ||
      this.selectedSubcategories.includes(formatToTextWithUnderscores(product.subcategoria!))
    );
  }

  private createCheckboxControls(): void {
    this.subcategories.forEach((subcategory: ISubcategory) => {
      const controlName = formatToTextWithUnderscores(subcategory.nombre);
      this.form.addControl(controlName, new FormControl(false));
    });
  }

  get paramOption(): ParamOption {
    return {
      name: this.route.snapshot.params['subcategory'] ? 'subcategory' : 'subcategories',
      value: this.selectedSubcategories.length === 1 ?
        unFormatToTextWithUnderscores(this.selectedSubcategories[0]) : 'Subc. varias'
    };
  }


  public isActivated(): boolean {
    return this.selectedSubcategories.length > 0;
  }

}
