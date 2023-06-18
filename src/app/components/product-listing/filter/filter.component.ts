import {Component, Input, OnInit} from '@angular/core';
import {ISubcategory} from "../model/ISubcategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() subcategories: ISubcategory[] = [];
  public form: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      initialPrice: ['', [Validators.min(0), Validators.max(1000000)]],
      finalPrice: ['', [Validators.min(0), Validators.max(1000000)]],
    });
    this.subcategories.forEach((subcategory: ISubcategory) => {
      const controlName = this.getFormControlName(subcategory.nombre);
      this.form.addControl(controlName, this.fb.control(false));
    });
  }

  public getFormControlName(nombre: string): string {
    return nombre.replace(/\s+/g, '_');
  }

}
