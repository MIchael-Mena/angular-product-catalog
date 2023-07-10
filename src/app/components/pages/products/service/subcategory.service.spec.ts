import {TestBed} from '@angular/core/testing';

import {SubcategoryService} from './subcategory.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ISubcategory} from "../model/ISubcategory";

// Agregar una X al inicio de la función it() o de describe para deshabilitarla.
describe('SubcategoryService', () => {
  let service: SubcategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SubcategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Limpiar cualquier petición pendiente.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get subcategories', () => {
    const expectedSubcategories: ISubcategory =
      {
        id: 2,
        nombre: 'Mouses',
        id_agrupador: 24,
        imagen: 'Mouses-2.jpg',
        orden: 3,
        imageUrl: service.apiUrlImg + 'Mouses-2.jpg'
      }
    const responseJson = [
      {
        "id": 2,
        "nombre": "Mouses ",
        "id_agrupador": 24,
        "imagen": "Mouses-2.jpg",
        "orden": 3
      }
    ]

    service.getSubcategories.subscribe((subcategories: ISubcategory[]) => {
      // Recibo un array de subcategorias despues de haberse aplicado el map
      // expect(subcategories.length).toBe(1);
      expect(subcategories[0]).toEqual(expectedSubcategories);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(responseJson);
  });

});
