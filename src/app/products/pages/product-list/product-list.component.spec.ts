import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Subject} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {SubcategoryService} from "../../services/subcategory.service";
import {SharedDataService} from "../../../shared/services/shared-data.service";
import {mockProducts, ProductServiceMock} from "../../services/product.service.mock";
import {mockSubcategories, SubcategoryServiceMock} from "../../services/subcategory.service.mock";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {IParamFilter} from "../../models/IParamFilter";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let sharedDataServiceMock: jasmine.SpyObj<SharedDataService<IParamFilter>>;

  let paramMapSubject: Subject<Params> = new Subject<Params>();

  beforeEach(() => {
    sharedDataServiceMock = jasmine.createSpyObj('SharedDataService', ['updateData']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
      /*      providers: [
     TODO: Si se declara en providers los mocks, no funciona los spy y tampoco el 'callThrough'
    TODO: al parecer es porque se crea una instancia de la clase y no se usa la instancia que se le pasa
            ]*/
    }).overrideComponent(ProductListComponent, {
      set: {
        providers: [
          {provide: ProductService, useClass: ProductServiceMock},
          {provide: SubcategoryService, useClass: SubcategoryServiceMock},
          {provide: SharedDataService, useValue: sharedDataServiceMock},
          {
            provide: ActivatedRoute, useValue: {
              params: paramMapSubject.asObservable(),
            }
          }
        ]
      }
    }).compileComponents();
    // La diferencia entre useClass y useValues es que el primero crea una instancia
    // de la clase y el segundo usa la instancia que se le pasa

    fixture = TestBed.createComponent(ProductListComponent);
    // sharedDataServiceMock = TestBed.inject(SharedDataService<IParamFilter>) as jasmine.SpyObj<SharedDataService<IParamFilter>>;
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and subcategories on initialization', () => {
    // NgOnInit se ejecuta automáticamente con fixture.detectChanges()
    component.ngOnInit();

    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.subcategories).toEqual(mockSubcategories);
    expect(component.isLoading).toBeFalse();
  });

  it('should update shared data when route params change', () => {
    const mockParams: Params = {
      subcategory: 'Mouses',
      product: 'product'
    };

    // TODO: No funciona cuando se usa 'overrideComponent' en TestBed
    // sharedDataServiceMock.updateData.and.callThrough();

    component.ngOnInit();
    paramMapSubject.next(mockParams);

    expect(sharedDataServiceMock.updateData).toHaveBeenCalledTimes(1);
    expect(sharedDataServiceMock.updateData).toHaveBeenCalledWith(mockParams as IParamFilter);
  });

});


