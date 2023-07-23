import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../models/IProduct";
import {SubcategoryService} from "../../services/subcategory.service";
import {ISubcategory} from "../../models/ISubcategory";
import {forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];
  public subcategories: ISubcategory[] = [];
  public isLoading: boolean = true;
  public filtersIsLoading: boolean = true;
  private paramsIsSet: boolean = false;

  constructor(public productService: ProductService,
              public route: ActivatedRoute,
              public subcategoryService: SubcategoryService) {
  }

  ngOnInit(): void {
    // this.paramsIsSet = Boolean(this.route.snapshot.params);
    this.getData();
  }

  public filterProducts(filter: (products: IProduct[]) => IProduct[]): void {
    this.filteredProducts = filter(this.products);
  }

  private assignSubcategories(products: IProduct[]): void {
    products.forEach((product: IProduct) => {
      product.subcategoria = this.subcategories.find((subcategory: ISubcategory) => {
        return subcategory.id === product.id_subcategoria;
      })?.nombre.trim() || '';
    });
  }

  private getData(): void {
    forkJoin({
      products: this.productService.getProducts,
      subcategories: this.subcategoryService.getSubcategories
    }).subscribe({
      next: (data: { products: IProduct[], subcategories: ISubcategory[] }) => {
        this.subcategories = data.subcategories;
        this.assignSubcategories(data.products);
        this.products = data.products;
        // if (!this.paramsIsSet) this.filteredProducts = data.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
