import {Component, Input} from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: IProduct = <IProduct>{}

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  public addToCart(product: IProduct): void {
    this.shoppingCartService.addToCart(product);
  }

}
