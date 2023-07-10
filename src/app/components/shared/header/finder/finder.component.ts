import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  public searchControl: FormControl = new FormControl('');

  constructor(private router: Router) {
  }

  public clearInput(): void {
    this.searchControl.reset();
  }

  performSearch(): void {
    // I don't use validators because I don't want to show the warning color in the input
    if (this.searchControl.value !== '') {
      const value = this.searchControl.value;
      this.router.navigate(['lista-productos', 'todos', value]);
    }
  }
}

