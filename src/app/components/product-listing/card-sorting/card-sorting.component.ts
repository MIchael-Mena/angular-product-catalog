import {Component} from '@angular/core';

@Component({
  selector: 'app-card-sorting',
  templateUrl: './card-sorting.component.html',
  styleUrls: ['./card-sorting.component.scss'],
})
export class CardSortingComponent {

  public sortOptions: string[] = ['Destacado', 'Mayor precio', 'Menor precio'];
  /*  public sortOptions: { value: string, label: string }[] = [
      {value: 'Destacado', label: 'Destacado'},
      {value: 'Mayor precio', label: 'Mayor precio'},
      {value: 'Menor precio', label: 'Menor precio'}
    ];*/
  public selectedOption: string = 'Ordenar Productos';

  constructor() {
  }

  public sortProducts(): void {
    switch (this.selectedOption) {
      case 'Destacado':
        this.sortByFeatured();
        break;
      case 'Mayor precio':
        this.sortByHighestPrice();
        break;
      case 'Menor precio':
        this.sortByLowestPrice();
        break;
    }
    console.log(this.selectedOption);
  }

  public sortByFeatured(): void {
  }

  public sortByHighestPrice(): void {

  }

  public sortByLowestPrice(): void {

  }
}
