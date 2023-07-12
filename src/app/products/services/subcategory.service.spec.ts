import {TestBed} from '@angular/core/testing';

import {SubcategoryService} from './subcategory.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ISubcategory} from "../models/ISubcategory";
import {mockSubcategories, subcategoryResponseJson} from "./subcategory.service.mock";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

// Agregar una X al inicio de la función it() o de describe para deshabilitarla.
// TODO: las lineas comentadas con testbed son una forma alternativa de realizar el test
describe('SubcategoryService', () => {
  let service: SubcategoryService;
  // let httpMock: HttpTestingController;
  // let httpClientSpy: { get: jasmine.Spy }
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new SubcategoryService(httpClientSpy as any)
    /*    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(SubcategoryService);
        httpMock = TestBed.inject(HttpTestingController);*/
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get subcategories', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockSubcategories));

    service.getSubcategories.subscribe((subcategories: ISubcategory[]) => {
      // Recibo un array de subcategorías después de haberse aplicado el map
      // expect(subcategories.length).toBe(1);
      expect(subcategories[0]).toEqual(mockSubcategories[0]);
      done();
    });

    /*    const request = httpMock.expectOne(`${service.apiUrl}`);
        expect(request.request.method).toBe('GET');
        request.flush(subcategoryResponseJson);*/
  });

});
