import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCardComponent} from './product-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {FormatPricePipe} from "../../../../pipe/format-price.pipe";
import {IProduct} from "../model/IProduct";
import {ShoppingCartService} from "../../../../service/shopping-cart.service";

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let shoppingCartService: ShoppingCartService;
  let product: IProduct = <IProduct>{
    nombre: 'Product 1',
    imagenes: [{url: '/assets/images/image-mock.jpg'}],
    precio: 1000
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [MatCardModule, MatIconModule, FormatPricePipe, NgOptimizedImage],
      providers: [ShoppingCartService]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    shoppingCartService = TestBed.inject(ShoppingCartService);

    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product image', () => {
    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imageElement.src).toContain(product.imagenes[0].url!);
  });

  it('should display the product name', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(nameElement.textContent).toBe(product.nombre);
  });

  it('should display the formatted product price', () => {
    const priceElement: HTMLElement = fixture.nativeElement.querySelector('.price-highlight');
    expect(priceElement.textContent).toContain('$ 1.000');
  });

  it('should add the product to the cart when clicking the "Agregar al carrito" button', () => {
    const addToCartButton: HTMLButtonElement = fixture.nativeElement.querySelector('.button-add-product');
    spyOn(shoppingCartService, 'addToCart');
    addToCartButton.click();
    expect(shoppingCartService.addToCart).toHaveBeenCalledWith(product);
  });

});
