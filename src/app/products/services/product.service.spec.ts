import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IProduct} from "../models/IProduct";
import {mockProducts} from "./product.service.mock";

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service.getProducts.subscribe((products: IProduct[]) => {
      expect(products[0]).toEqual(mockProducts[0]);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockProducts);
  });

});
