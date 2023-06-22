import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {
  public searchControl: FormControl = new FormControl('', Validators.required);

  constructor(private router: Router) {
  }

  public clearInput(): void {
    this.searchControl.reset();
  }

  performSearch(): void {
    if (this.searchControl.valid) {
      const value = this.searchControl.value;
      this.router.navigate(['lista-productos', 'todos', value]);
    }
  }
}

