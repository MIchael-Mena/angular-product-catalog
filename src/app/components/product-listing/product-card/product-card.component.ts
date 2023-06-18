import {Component, Input} from '@angular/core';
import {IProduct} from "../model/IProduct";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: IProduct = <IProduct>{};

  constructor() {
  }

  public addToCart(product: IProduct): void {

  }
}
