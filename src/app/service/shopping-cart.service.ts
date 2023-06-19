import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {IProduct} from "../components/product-listing/model/IProduct";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private replaySubject = new ReplaySubject<number>(0);
  private readonly products: IProduct[] = [];

  constructor() {
  }

  public getCartItemCount(): Observable<number> {
    return this.replaySubject.asObservable();
  }

  public addToCart(product: IProduct) {
    this.products.push(product);
    this.replaySubject.next(this.products.length);
  }

  public getCurrentPrice(): number {
    return this.products.reduce((totalPrice: number, product: IProduct) => totalPrice + product.precio, 0);
  }

  public cleanCart(): void {
    this.products.splice(0, this.products.length);
    this.replaySubject.next(this.products.length);
  }

}
