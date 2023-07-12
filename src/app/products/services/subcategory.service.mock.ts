import {Observable, of} from "rxjs";
import {ISubcategory} from "../models/ISubcategory";
import {environment} from "../../../enviroments/environment";

export const mockSubcategories: ISubcategory[] = [
  {
    id: 2,
    nombre: 'Mouses',
    id_agrupador: 24,
    imagen: 'Mouses-2.jpg',
    orden: 3,
    imageUrl: environment.baseURLImgSubcategories + 'Mouses-2.jpg'
  }
];

export const subcategoryResponseJson = [
  {
    "id": 2,
    "nombre": "Mouses ",
    "id_agrupador": 24,
    "imagen": "Mouses-2.jpg",
    "orden": 3
  }
]

export class SubcategoryServiceMock {

  get getSubcategories(): Observable<ISubcategory[]> {
    return of(mockSubcategories)
  }

}
