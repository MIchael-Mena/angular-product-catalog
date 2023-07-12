import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {SubcategoryService} from "../../services/subcategory.service";
import {SharedDataService} from "../../../shared/services/shared-data.service";
import {mockProducts, ProductServiceMock} from "../../services/product.service.mock";
import {mockSubcategories, SubcategoryServiceMock} from "../../services/subcategory.service.mock";
import {ProductsModule} from "../../products.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;


  let productServiceMock: ProductServiceMock;
  let subcategoryServiceMock: SubcategoryServiceMock;
  let sharedDataServiceMock: jasmine.SpyObj<SharedDataService>;

  beforeEach(() => {
    sharedDataServiceMock = jasmine.createSpyObj('SharedDataService', ['updateData']);

    TestBed.configureTestingModule({
      // declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ProductsModule, NoopAnimationsModule],
      providers: [
        {provide: ProductService, useClass: ProductServiceMock},
        {provide: SubcategoryService, useClass: SubcategoryServiceMock},
        {provide: SharedDataService, useValue: sharedDataServiceMock},
        {provide: ActivatedRoute, useValue: {params: of({subcategory: 'Mouses', product: 'product'})}}
      ]
    })
    // La diferencia entre useClass y useValues es que el primero crea una instancia
    // de la clase y el segundo usa la instancia que se le pasa

    fixture = TestBed.createComponent(ProductListComponent);
    productServiceMock = TestBed.inject(ProductService);
    subcategoryServiceMock = TestBed.inject(SubcategoryService);
    sharedDataServiceMock = TestBed.inject(SharedDataService) as jasmine.SpyObj<SharedDataService>;

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and subcategories on initialization', () => {
    component.ngOnInit();

    // 'toHaveBeenCalled' solo funciona con los métodos que se han espiado con 'spyOn' o 'createSpyObj'
    // no lo utilizo, ya que 'getProducts' y 'getSubcategories' devuelven un observable
//     expect(productServiceMock.getProducts).toHaveBeenCalled();
//     expect(subcategoryServiceMock.getSubcategories).toHaveBeenCalled();

    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.subcategories).toEqual(mockSubcategories);
    expect(component.isLoading).toBeFalse();
  });

});


